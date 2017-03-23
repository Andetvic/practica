$(function(){
  var tiempo = {
    hora: 0,
    minuto: 0,
    segundo: 0
  };

  var tiempo_corriendo = null;

  $("#comenzar").click(function(){
    if ( $(this).text() == 'Comenzar' || $(this).text() == 'Continuar')
    {
      $(this).text('Pausar');
      tiempo_corriendo = setInterval(function(){
        // Segundos
        tiempo.segundo++;
        if(tiempo.segundo >= 60)
        {
          tiempo.segundo = 0;
          tiempo.minuto++;
        }

        // Minutos
        if(tiempo.minuto >= 60)
        {
          tiempo.minuto = 0;
          tiempo.hora++;
        }

        $("#minuto").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
        $("#segundo").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
      }, 1000);
    }
    else
    {
      $(this).text('Continuar');
      clearInterval(tiempo_corriendo);
    }
  })

  $("#reset").click(function(){
    $("#minuto").text('00');
    $("#segundo").text('00');
    $("#comenzar").text('Comenzar');
    var tiempo = {
      hora: 0,
      minuto: 0,
      segundo: 0
    };
  })
});
