var fecha = new Date()
var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
var fechaFormateada = new Date().toLocaleString("es-ES", options);
var options2 = {hour: "numeric", minute: "numeric", second: "numeric", hour12:"false"}
var hora = new Date().toLocaleTimeString("es-ES", options2)
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

/* Datos que se muestran */
document.getElementById("h1").innerHTML = msj;
document.getElementById("fecha").innerHTML = fechaFormateada;
document.getElementById("hora").innerHTML = hora;

var r1 = document.getElementById("h2").innerHTML;
var rpta1;
document.getElementById("rpta1").innerHTML = r1;
var r2 = document.getElementById("h1").outerHTML;
var rpta2;
document.getElementById("rpta2").innerHTML = r2;
var r3 = window.location.href;
var rpta3;
document.getElementById("rpta3").innerHTML = r3;
var r4 = window.location;
var rpta4;
document.getElementById("rpta4").innerHTML = r4;
var r5a = window.screen.width;
var r5b = window.screen.height;
var rpta5;
document.getElementById("rpta5").innerHTML = 'Resolución: ' + r5a + 'px x ' + r5b + 'px';
