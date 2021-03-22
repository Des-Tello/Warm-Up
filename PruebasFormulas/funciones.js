    

    function calculos(){
        //datos minimos
    var valorcredito = parseInt(document.getElementById('valorcredito').value);
    var plazo = parseInt(document.getElementById('plazo').value);
    var interes = parseFloat(document.getElementById('porcentajeInteres').value)/100;

    if(!valorcredito || !plazo || !interes){
        alert("Porfavor ingrese como los valores minimos que necesitamos: El valor de su credito, el plazo pactado y la taza de interes");
        
    }else{
        
        var cuota = parseInt(document.getElementById('valorcuota').value);
        var seguros = parseInt(document.getElementById('seguros').value);
        var gastos = parseInt(document.getElementById('gastos').value);
        var montobruto = 0;
        
        //¿Existen Gastos?
        if(gastos){
            valorcredito += gastos;
            document.getElementById('resultadogastos').innerHTML=gastos;
        }else{
            document.getElementById('resultadogastos').innerHTML="Usted no cuenta con gastos asociados";
        }
        //¿Existen Seguros?
        if(!seguros){
            document.getElementById('resultadoseguros').innerHTML="Usted No cuenta con seguros asociados";
            montobruto = valorcredito;
        }else{
            document.getElementById('resultadoseguros').innerHTML=seguros;
            montobruto = valorcredito + seguros;
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
            var CAE2 = IRR*12*100
            //console.log(CAE2);
            
            //Se Muestran resultados
            document.getElementById('resultadovalorcuota').innerHTML=cuota;
            document.getElementById('resultadointeres').innerHTML=interes;
            document.getElementById('resultadocae').innerHTML=CAE2;   
            document.getElementById('resultadomontobruto').innerHTML=montobruto;
            document.getElementById('resultadototalintereses').innerHTML=costototal-montobruto;
            document.getElementById('resultadocostototal').innerHTML=costototal;    
    }

    //var claseValorcuota = parseInt(document.getElementsByClassName('valorcredito').value);
    //console.log(claseValorcuota);
    //console.log(valorcredito)

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
    }
    if (check2.checked) {
        element2.style.display='block';
    }
    else {
        element2.style.display='none';
    }
}
