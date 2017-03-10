function muestraOculta(){

  var e = document.getElementById('oculta');
  var t = document.getElementById('btnOculta');

    if ( e.style.display != 'none' ) {
        e.style.display = 'none';
        t.value = "Muestra";
    }
    else {
        e.style.display = '';
        t.value = "Ocultar";
    }

}
var fecha = new Date()
if (fecha.getHours() < 5) {
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
document.getElementById("saludo").innerHTML = msj;

function validar(e) {
tecla = (document.all) ? e.keyCode : e.which;
patron = /1/; //ver nota
te = String.fromCharCode(tecla);
return patron.test(te);
}

function agrega(input, character)
{
  if(input.value == null || input.value == "0")
  input.value = character
  else
  input.value += character
}

function borra(input)
{
  input.value = input.value.substring(0, input.value.length - 1)
}

function invertir(input)
{
  if(input.value.substring(0, 1) == "-")
  input.value = input.value.substring(1, input.value.length)
  else
  input.value = "-" + input.value
}

function final(form)
{
  var valor = form.pantalla.value;
  if(valor.indexOf("^") != -1){
	potenciacion(form);
  }else{
	form.pantalla.value = eval(form.pantalla.value);
  }
}

function cuadrado(form)
{
  form.pantalla.value = Math.pow(eval(form.pantalla.value),2);
}

function potenciacion(form)
{
  var num = form.pantalla.value.split("^");
  form.pantalla.value = Math.pow(num[0],num[1]);
}

function raiz(form)
{
  form.pantalla.value = Math.sqrt(eval(form.pantalla.value));
}

function probabilidad(form)
{
  form.pantalla.value = 1/eval(form.pantalla.value);
}

function porcentaje(form)
{
  form.pantalla.value = eval(form.pantalla.value)/100;
}

function opera(str)
{
  for (var i = 0; i < str.length; i++) {
    var ch = str.substring(i, i+1)
    if (ch < "0" || ch > "9") {
      if (ch != "." && ch != "/" && ch != "*" && ch != "+" && ch != "-"
      && ch != "(" && ch!= ")" && ch!= "^") {
        alert("Operación Invalida!")
        return false
      }
    }
  }
  return true
}
