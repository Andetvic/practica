var tiempo = {
  minuto: 0,
  segundo: 0,
  milisegundo: 0
};

var tiempo_corriendo = null;

$(function() {
  function cocopa() {
    if ($("#comenzar").text() == 'Comenzar' || $("#comenzar").text() == 'Continuar') {
      $("#comenzar").text('Pausar');
      tiempo_corriendo = setInterval(function() {
        // milisegundo
        tiempo.milisegundo++;
        if (tiempo.milisegundo > 10) {
          tiempo.milisegundo = 0;
          tiempo.segundo++;
        }

        // Segundos
        if (tiempo.segundo >= 60) {
          tiempo.segundo = 0;
          tiempo.minuto++;
        }

        // Minutos
        if (tiempo.minuto >= 60) {
          tiempo.minuto = 0;
          tiempo.hora++;
        }

        $("#minuto").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
        $("#segundo").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
        $("#milisegundo").text(tiempo.milisegundo < 10 ? '0' + tiempo.milisegundo : tiempo.milisegundo);
      }, 90);
    } else {
      $("#comenzar").text('Continuar');
      clearInterval(tiempo_corriendo);
    }
  }

  $("#comenzar").on('click', cocopa())

  function fin() {
    $("#minuto").text('00');
    $("#segundo").text('00');
    $("#milisegundo").text('00');
    $("#comenzar").text('Comenzar');
    tiempo.milisegundo = 0;
    tiempo.segundo = 0;
    tiempo.minuto = 0;
    clearInterval(tiempo_corriendo);
  }

  $("#reset").on('click',fin())

  $("body").on('tap', function(){cocopa()});
  $("body").on('swipe', function(){fin()});
});
