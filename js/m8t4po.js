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

var t, actual;

localStorage.galeriaactual = localStorage.galeriaactual || JSON.stringify(galeriaInicial);
galeria = JSON.parse(localStorage.galeriaactual);

function select(i){
   actual = i;

   $("nav a")
     .removeClass("on off")
     .addClass(function(j){return(j===i)?"on":"off";});

   $("#autor").html(galeria[i].autor);
   $("#cita").html(galeria[i].cita);
   $("#foto").css("background-image", "url("+galeria[i].foto+")");

   clearTimeout(t);
   t = setTimeout( function(){select((i + 1) % galeria.length);}, 4000);
 }

function generar_selector(){ // regenera la botonera
  var selector = $("#selector");

  selector.html("");

  galeria.forEach(function(elem,i) {
    selector.append("<li><a onClick='select("+i+")'></a></li>");
  });
}

$(function (){
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

  generar_selector();

  if($('#info2').is(':visible')){editar()}

  function editar() {
    clearTimeout(t);

    $("#autor_d").html(galeria[actual].autor);
    $("#cita_d").html(galeria[actual].cita);
    $("#foto_d").html(galeria[actual].foto);
  }

  // Función agrega array
  $("#nuevo").on("click", function(){
    actual = galeria.push({
      autor:$("#autor_d").html(),
      cita:$("#cita_d").html(),
      foto:$("#foto_d").html()
    }) - 1;

    generar_selector();

    select(actual);

    localStorage.galeriaactual=JSON.stringify(galeria);
  })

  // Función guardar array
  $("#guardar").on("click", function(){
    $(".oculto").hide();
    galeria[actual].autor = $("#autor_d").html();
    galeria[actual].cita = $("#cita_d").html();
    galeria[actual].foto = $("#foto_d").html();
    select(actual);
    localStorage.galeriaactual=JSON.stringify(galeria);
  })

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
    localStorage.galeriaactual=JSON.stringify(galeria);
  })

  // botón inicializar galería
    $("#restablecer").on("click", function(){
    localStorage.galeriaactual=JSON.stringify(galeriainicial);
    galeria=JSON.parse(localStorage.galeriaactual);
    $(".oculto").hide();
    select(0);
    })
 //hasta aquí

  select(0);
});
