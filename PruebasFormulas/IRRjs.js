  var IRRval = [];
  plazo = 36;

  valorcredito = 3000000;
  
  valorcuota = 125416;

    IRRval.push(-valorcredito);
    for (i = 0; i < plazo; i++) {
        IRRval.push(valorcuota);
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
    var CAE = Math.pow((1+IRR),12)-1
    var CAE2 = IRR*12*100
    //console.log(CAE2);

