const formatter = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 0});
    
    var creditos = [];
    
   
    var deHEAD ='<thead class="titulo_tabla">'+
            '<tr>'+
            '<th>Valor Cuota</th>'+
            '<th>CAE</th>'+
            '<th>Interes[%]</th>'+
            '<th>Gastos Asociados</th>'+
            '<th>Seguro Asociados</th>'+
            '<th>Total de Interes</th>'+
            '<th>Monto Bruto</th>'+
            '<th>Costo Total</th>'+
            '</tr>'+
            '</thead>';
            
    function calculos(){
        //datos minimos
    var valorcredito = parseInt(document.getElementById('valorcredito').value);
    var plazo = parseInt(document.getElementById('plazo').value);
    var interes = parseFloat(document.getElementById('porcentajeInteres').value)/100;
    var valorcuota =parseInt(document.getElementById('valorcuota').value);

    if(!valorcredito || !plazo || !interes){
        alert("Porfavor ingrese como los valores minimos que necesitamos: El valor de su credito, el plazo pactado y la taza de interes");}
    else if(valorcredito < 0 ){
        alert("Recuerde que el valor del credito tiene que ser positivo.");}

    else if(plazo <2 || plazo >48) 
        { alert("El plazo solo esta permitido de a 2 a 48 meses.");}

    else if(interes < 0) 
        { alert("No puede tener intereses menores a 0%.");}
    
    else if(interes > 50) 
        { alert("No puede tener intereses superiores a 50%.");}  

    else if(valorcuota > valorcredito) 
        {alert("El valor de cuota no puede superar el valor del credito.");}

    else if(valorcuota < 0 ) {alert("El valor de la cuota no puede ser menor a 0.");}
    
    else{

        var cuota = parseInt(document.getElementById('valorcuota').value);
        var seguros = parseInt(document.getElementById('seguros').value);
        var gastos = parseInt(document.getElementById('gastos').value);
        var montobruto = 0;
        
        //¿Existen Gastos?
        if(gastos){
            valorcredito += gastos;
            gastos = formatter.format(gastos);
            //document.getElementById('resultadogastos').innerHTML=gastos;
        }
        else{
          //  document.getElementById('resultadogastos').innerHTML="N.R"; //No registra
          gastos='N.R.'
        }
        //¿Existen Seguros?
        if(!seguros){
           // document.getElementById('resultadoseguros').innerHTML="N.R"; //No registra 
            montobruto = valorcredito;
            seguros='N.R.'
        }
        else{
          //  document.getElementById('resultadoseguros').innerHTML=seguros;
            montobruto = valorcredito + seguros;
            seguros = formatter.format(seguros)
        }
        //Si no tenemos cuota, la calculoamos
        if(!cuota){
            //calculo de la cuota
            var x = Math.pow((1+interes), plazo)*(interes)
            var y = Math.pow((1+interes),plazo) - 1
            cuota = montobruto*(x/y);
        }
        
        var costototal = parseInt(cuota *  plazo);
    
        
    
       //Funcion CAE
            
            var CAE = cae(valorcredito,plazo,cuota)
            var CAE2 = CAE.toFixed(2)
            //console.log(CAE2);
            
            //Se Crea un objeto para ordenar
            var credito = {
                valorcuota: cuota.toFixed(0),
                interes: interes.toFixed(2),
                CAE: CAE2,
                gastos: gastos,
                seguros:seguros,
                montobruto: montobruto,
                totalinteres: costototal-montobruto,
                costototal: costototal
            }

            //creditos.push(credito)
            //localStorage.setItem("creditos",JSON.stringify(creditos)) //sobreescribir
            //console.log(JSON.parse(localStorage.getItem("creditos")))

            //Formato del peso chileno

            //for (var i = 0; i < creditos.length; i++) {
            //agrego el elemento a la tabla para mostrar
                var deBODY = '<tr class="contenido_tabla" id="contenido_tabla">'+
                '<th>'+formatter.format(credito.valorcuota)+'</th>'+
                '<th>'+credito.CAE+'%</th>'+
                '<th>'+credito.interes*100+'%</th>'+
                '<th>'+credito.gastos+'</th>'+
                '<th>'+credito.seguros+'</th>'+
                '<th>'+formatter.format(credito.totalinteres)+'</th>'+
                '<th>'+formatter.format(credito.montobruto)+'</th>'+
                '<th>'+formatter.format(credito.costototal)+'</th>'+
                '</tr>';
              //  }
              $('#table').append(deHEAD);
              $('.valores_cae').append(deBODY);
                deHEAD=''
                deBODY=''


               

                
    }
            

}
//Funcion Cae
function cae(valorcredito,plazo,cuota){

    var IRRval = [];
            IRRval.push(-valorcredito);
    
            for (i = 0; i < plazo; i++) {
                IRRval.push(cuota);
            }
    
            var IRR = IRRCalc(IRRval, 0.001) * 0.01;
    
            function IRRCalc(CArray, guest) {
                inc = 0.000001;
                do {
                    guest += inc;
                    NPV = 0;
                    for (var j=0; j < CArray.length; j++) {
                        NPV += CArray[j] / Math.pow((1 + guest), j);
                    }
                } while (NPV > 0);
                return guest * 100;
            }
            //var CAE = Math.pow((1+IRR),12)-1
            var CAE = IRR*12*100
            return CAE
}



//Funcion Que Muestra Contenidos 
function showContent() {
    element = document.getElementById("content");
    element2 = document.getElementById("content2");
    check = document.getElementById("check");
    check2 = document.getElementById("check2");
    if (check.checked) {
        element.style.display='block';
    }
    else {
        element.style.display='none';
        document.getElementById("seguros").value = '';
    }
    if (check2.checked) {
        element2.style.display='block';
    }
    else {
        element2.style.display='none';
        document.getElementById("gastos").value = '';
    }
    
}
