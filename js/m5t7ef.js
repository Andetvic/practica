$(function(){
  var fecha = new Date()
  var msj;

  if (fecha.getHours() < 7) {
    msj = "<img src='images/noche.png' alt='noche'> Buenas noches";
  }
  else if (fecha.getHours() < 12) {
    msj = "<img src='images/manana.png' alt='dia'> Buenos días";
  }
  else if (fecha.getHours() < 21) {
    msj = "<img src='images/dia.png' alt='tarde'> Buenas tardes";
  }
  else {
    msj = "<img src='images/noche.png' alt='noche'> Buenas noches";
  }

  $('#saludo').html(msj);
  $('#oculta').css({'display':'none'});

  $('#btnOculta').click(function() {
    $('#oculta').toggle('fast', function() {
      if ($('#btnOculta').val()==='Mostrar') {
        $('#btnOculta').val('Ocultar');
      }
      else {
        $('#btnOculta').val('Mostrar');
      }
    });
  });

  function agrega(character) {
    var _input = $('#pantalla');
    if(_input.val() == null || _input.val() == "0")
    _input.val(character)
    else
    _input.val(_input.val() + character)
  }

  function borra()
  {
    $('#pantalla').val($('#pantalla').val().slice(0,-1));
  }

  function opera() {
    var str = $('#pantalla').val();
    for (var i = 0; i < str.length; i++) {
      var ch = str.substring(i, i+1)
      if (ch < "0" || ch > "9") {
        if (ch != "." && ch != "÷" && ch != "x" && ch != "+" && ch != "-" && ch != "(" && ch!= ")" && ch!= "^") {
          alert("Operación Invalida!");
          return false;
        }
      }
    }
    str = str.replace('x','*');
    str = str.replace('÷','/');
    final(str);
  }

  function potenciacion(valor) {
    var num = valor.split("^");
    $('#pantalla').val(Math.pow(num[0],num[1]));
  }

  function cuadrado() {
    $('#pantalla').val(Math.pow(eval($('#pantalla').val()),2));
  }

  function raiz() {
    $('#pantalla').val(Math.sqrt(eval($('#pantalla').val())));
  }

  function probabilidad() {
    $('#pantalla').val(1/eval($('#pantalla').val()));
  }

  function porcentaje() {
    $('#pantalla').val(eval($('#pantalla').val())/100);
  }

  function factorial() {
    var str = $('#pantalla').val();
  	var total = 1;
  	for (i=1; i<=str; i++) {
  		total = total * i;
  	}
  	$('#pantalla').val(total);
  }

  function invertir() {
    var valor = $('#pantalla').val();
    if(valor.substring(0, 1) == "-")
    $('#pantalla').val(valor.substring(1, valor.length));
    else
    $('#pantalla').val("-" + valor)
  }

  function final(valor) {
    if(valor.indexOf("^") != -1){
      potenciacion(valor);
    }else{
      $('#pantalla').val(eval(valor));
    }
  }

  $('#n0').on('click',function() {
    agrega('0')
  });
  $('#n1').on('click',function() {
    agrega('1')
  });
  $('#n2').on('click',function() {
    agrega('2')
  });
  $('#n3').on('click',function() {
    agrega('3')
  });
  $('#n4').on('click',function() {
    agrega('4')
  });
  $('#n5').on('click',function() {
    agrega('5')
  });
  $('#n6').on('click',function() {
    agrega('6')
  });
  $('#n7').on('click',function() {
    agrega('7')
  });
  $('#n8').on('click',function() {
    agrega('8')
  });
  $('#n9').on('click',function() {
    agrega('9')
  });
  $('#punto').on('click',function() {
    agrega('.')
  });
  $('#parentesisI').on('click',function() {
    agrega('(')
  });
  $('#parentesisF').on('click',function() {
    agrega(')')
  });
  $('#suma').on('click',function() {
    agrega('+')
  });
  $('#resta').on('click',function() {
    agrega('-')
  });
  $('#multiplica').on('click',function() {
    agrega('x')
  });
  $('#divide').on('click',function() {
    agrega('÷')
  });
  $('#opuesto').on('click',function() {
    invertir()
  });
  $('#cuadrado').on('click',function() {
    cuadrado()
  });
  $('#potencia').on('click',function() {
    agrega('^')
  });
  $('#radical').on('click',function() {
    raiz()
  });
  $('#porcentaje').on('click',function() {
    porcentaje()
  });
  $('#probable').on('click',function() {
    probabilidad()
  });
  $('#factor').on('click',function() {
    factorial()
  });
  $('#limpiar').on('click',function() {
    $('#pantalla').val('');
  });
  $('#borrar').on('click',function() {
    borra();
  });
  $('#igual').on('click',function() {
    opera();
  });
});
