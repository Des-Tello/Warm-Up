const formatter = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 0});
    
var creditos = [];
var num=1;

var deHEAD ='<thead class="titulo_tabla">'+
        '<tr>'+
        '<th>#</th>'+
        '<th>Valor Cuota</th>'+
        '<th>CAE</th>'+
        '<th>Interes</th>'+
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
var cuota = parseInt(document.getElementById('valorcuota').value);
var seguros = parseInt(document.getElementById('seguros').value);
var gastos = parseInt(document.getElementById('gastos').value);

if(!valorcredito || !plazo || !interes){//datos minitmos
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

else if(gastos<0){alert("Si va a ingresar gastos, que sean valores validos")}

else if(seguros<0){alert("Si va a ingresar seguros, que sean valores validos")}

else{

    var montobruto = 0;
    
    //¿Existen Gastos?
    if(gastos >= 0){
        valorcredito += gastos;
        gastos = formatter.format(gastos);
        
    }
    else{
     
      gastos='N.R.'; 
    }
    //¿Existen Seguros?

    if(!seguros){
        //No registra 
        //si no posee seguros entonces el monto bruto sera el mismo valor del credito
         montobruto = valorcredito;
         seguros='N.R.' ; 
     }
    else{
        //si hay seguros se suman
        montobruto = valorcredito + seguros;
        seguros = formatter.format(seguros);
    }
    
    //calcularemos una cuota de referencia y luego veremos si usamos este o el que nos entrega el usuario, si es que lo entrega
    var a = Math.pow((1+interes), plazo)*(interes);
    var b = Math.pow((1+interes),plazo) - 1;
    var cuotareferencia = montobruto*(a/b);

    

    if(!cuota){
        cuota = cuotareferencia 
    }
    //validar cuota
    if((cuotareferencia*2)<cuota){
        alert('Cuota No Valida'); 
    }
    else{
        var costototal = parseInt(cuota *  plazo);
        var totalinteres = costototal-montobruto;
        

        //calculo del CAE
             
             var CAE = cae(valorcredito,plazo,cuota)
             var CAE2 = CAE.toFixed(2)
        
             //Ultimas confirmaciones

            if(totalinteres<0){alert("Porfavor ingrese valores validos pues en su consulta existe un costo total a pagar menor al credito solicitado")}
            else if(CAE2>100.00){alert("Usted Obtuvo una CAE que no es posible")}

            else{

             
             //se crea un objeto para imprimir 
             var credito = {
                valorcuota: cuota.toFixed(0),
                interes: interes*100,
                CAE: CAE2,
                gastos: gastos,
                seguros:seguros,
                montobruto: montobruto,
                totalinteres: totalinteres,
                costototal: costototal
             }
               //se siguen agregando datos la tabla que se mostrará en la ventana del usuario
             var deBODY = '<tr class="contenido_tabla" id="contenido_tabla">'+
             '<th>'+num+'</th>'+
             '<th>'+formatter.format(credito.valorcuota)+'</th>'+
             '<th>'+credito.CAE+'%</th>'+
             '<th>'+credito.interes.toFixed(2)+'%</th>'+
             '<th>'+credito.gastos+'</th>'+
             '<th>'+credito.seguros+'</th>'+
             '<th>'+formatter.format(credito.totalinteres)+'</th>'+
             '<th>'+formatter.format(credito.montobruto)+'</th>'+
             '<th>'+formatter.format(credito.costototal)+'</th>'+
             '</tr>';
       
           $('#table').append(deHEAD);
           $('.valores_cae').append(deBODY);
             deHEAD=''
             deBODY=''
             
             
             }
 
           
 
 
                
    num++
    }

    
    
    
            
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