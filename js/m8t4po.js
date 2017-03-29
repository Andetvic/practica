var galeriaInicial =
[
   { autor:"Buddha - बुद्धा",
     cita:"Si tiene solución, ¿por qué lloras? Si no tiene solución, ¿por qué lloras?.",
     foto:"images/1-Buddha.jpg"
   },
   { autor:"Khalil Gibran - جبران خليل جبران بن ميخائل بن سعد",
     cita:"Los hombres que no perdonan a las mujeres sus pequeños defectos jamás disfrutarán de sus grandes virtudes.",
     foto:"images/2-Khalil.jpg"
   },
   { autor:"Confucio - 孔子",
     cita: "Todo tiene belleza pero no todo el mundo la puede ver.",
     foto:"images/3-Confucio.jpg"
   },
   { autor:"Lev Nikoláievich Tolstói - Лев Николаевич Толстой",
     cita:"Mi felicidad consiste en que sé apreciar lo que tengo y no deseo con exceso lo que no tengo.",
     foto:"images/4-Tolstoi.jpg"
   },
   { autor:"Platón - Πλάτων",
     cita:"El más importante y principal negocio público es la buena educación de la juventud.",
     foto:"images/5-Platon.jpg"
   },
   { autor:"Henrik Ibsen - hɛnɾɪk ˈjoːhɑn ˈɪpsən",
     cita:"Si dudas de ti mismo, estás vencido de antemano.",
     foto:"images/6-Henrik.jpg"
   }
];

var t;
var actual = 0;

localStorage.galeriaActual = localStorage.galeriaActual || JSON.stringify(galeriaInicial);
galeria = JSON.parse(localStorage.galeriaActual);

function select(i){
   actual = i ? i : 0;
   
   var indice = galeria[actual];
   var autor = indice.autor;
   var cita = indice.cita;
   var foto = indice.foto;

   $("nav a")
     .removeClass("on off")
     .addClass(function(j){return(j===i)?"on":"off";});
	
	cita = '<p id="cita" class="animated bounceInLeft">'+cita+'</p>';
	autor = '<p id="autor" class="animated bounceInUp">'+autor+'</p>';
   $(".textos").html(cita + autor);
   $("#foto").css("background-image", "url("+foto+")");

   try{
   clearTimeout(t);
   }catch(e){}
   t = setTimeout( function(){select((actual + 1) % galeria.length);}, 4000);
 }

function generar_selector(){ // regenera la botonera
  var selector = $("#selector");

  selector.html("");

  galeria.forEach(function(elem,i) {
    selector.append("<li><a onClick='select("+i+")'></a></li>");
  });
}

$(function (){
  generar_selector();

  $(".oculto").hide();
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

  $('#refInfo2').on("click", function(){
    select(actual);
    clearTimeout(t);
    $("#autor_d").html(galeria[actual].autor);
    $("#cita_d").html(galeria[actual].cita);
    $("#foto_d").html(galeria[actual].foto);
  });

  // Función agrega array
  $("#nuevo").on("click", function(){
    actual = galeria.push({
      autor:$("#autor_d").html(),
      cita:$("#cita_d").html(),
      foto:$("#foto_d").html()
    }) - 1;
    generar_selector();

    localStorage.galeriaActual=JSON.stringify(galeria);
    select(actual);
  });

  // Función guardar array
  $("#guardar").on("click", function(){
    select(actual);
    $(".oculto").hide();
    galeria[actual].autor = $("#autor_d").html();
    galeria[actual].cita = $("#cita_d").html();
    galeria[actual].foto = $("#foto_d").html();

    localStorage.galeriaActual=JSON.stringify(galeria);
  });

  // Función borrar array
  $("#borrar").on("click", function(){
    $(".oculto").hide();
    galeria.splice(actual,1);
    if(galeria.length===0){
      $("#cita").html(" ");
      $("#autor").html(" ");
      $("#foto").css("background-image", "none");
      $("#autor_d").html(" ");
      $("#autor_d").attr("data-placeholder","Agrega un autor.");
      $("#cita_d").html(" ");
      $("#cita_d").attr("data-placeholder","Agrega una cita.");
      $("#foto_d").html(" ");
      $("#foto_d").attr("data-placeholder","Agrega una URL.");
    } else {
      generar_selector();
      select(actual);
    }
    localStorage.galeriaActual=JSON.stringify(galeria);
    select(actual);
  });

  // botón restablecer galería
  $("#restablecer").on("click", function(){
    localStorage.galeriaActual=JSON.stringify(galeriaInicial);
    galeria=JSON.parse(localStorage.galeriaActual);
    generar_selector();
    $(".oculto").hide();
    select(0);
  });
  
$("#anterior").on("click", function(){
	actual = actual - 1;
	if (actual < 0) {
		actual = galeria.length;
	}
	select(actual);
});

$("#siguiente").on("click", function(){
	actual = actual + 1;
	if ( actual > galeria.length) {
		actual = 0;
	}
	select(actual);
});

  select(0);
});
