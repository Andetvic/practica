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

  $(".oculto").hide();
  $('#info1').show()
  $(".inf").click(function(){
    var nodo = $(this).attr("href");

    if ($(nodo).is(":visible")){
      $(nodo).hide();
      return false;
    }else{
      $(".oculto").hide("slow");
      $(nodo).fadeToggle('fast');
      return false;
    }
  });
});
