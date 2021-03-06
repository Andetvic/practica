var map, lat, lng;
var posicionGEO = [];

localStorage.posiciones = (localStorage.posiciones || "");

$(function(){
    $('.oculto').hide();

    if (($('#info1').attr('class','oculto')?true:false)==false) {
      $('#info1').hide();
    } else {
      $('#info1').show();
    }
    function primeramente() {
      $('#info1').show();
      $('#info2').hide();
      $('#info3').hide();
      $('#info4').hide();
    }
    $('#btn1').on('click',primeramente);
    $('#btn2').on('click',function(){
      $('#info1').hide();
      $('#info2').show();
      $('#info3').hide();
      $('#info4').hide();
    });
    $('#btn3').on('click',function(){
      $('#info1').hide();
      $('#info2').hide();
      $('#info3').show();
      $('#info4').hide();
    });
    $('#btn5').on('click',function(){
      $('#info1').hide();
      $('#info2').hide();
      $('#info3').hide();
      $('#info4').show();
    });
    $('#btn4').on('click',primeramente);
    $('#btn6').on('click',primeramente);

    function enlazarMarcador(e){
      var alat, alng;
      // muestra ruta entre marcas anteriores y actuales
      map.drawRoute({
        origin: [lat, lng],  // origen en coordenadas anteriores
        // destino en coordenadas del click o toque actual
        destination: [e.latLng.lat(), e.latLng.lng()],
        travelMode: 'driving',
        strokeColor: '#d34836',
        strokeOpacity: 0.6,
        strokeWeight: 4
      });

      alat = lat;
      alng = lng;
      lat = e.latLng.lat();   // guarda coords para marca siguiente
      lng = e.latLng.lng();

      posicionGEO.push([lat,lng]);
      localStorage.posiciones = JSON.stringify(posicionGEO);

      map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
    };

    function reiniciar(){
      map.cleanRoute();
      map.removeMarkers();
      map.addMarker({ lat: lat, lng: lng});  // marcador en [lat, lng]
      localStorage.posiciones = "";
      posicionGEO = [];
      geolocalizar();
      location.reload();
    };

    function compactar(){
      map.cleanRoute();
      map.removeMarkers();
      //Marcamos el punto de partida.
      map.addMarker({lat:posicionGEO[0][0],lng:posicionGEO[0][1]});
      //He cambiado el strokeColor, para que la la antigua ruta salga en rojo.
      map.drawRoute({
        origin:[posicionGEO[0][0],posicionGEO[0][1]],
        destination: [lat, lng],
        travelMode: 'driving',
        strokeColor: '#ff0000',
        strokeOpacity: 0.6,
        strokeWeight: 4
      });
      posicionGEO.length=1;  //eliminamos todos los puntos salvo longtitud y latitud inicial
      posicionGEO.push([lat,lng]);
      localStorage.posiciones = "";
      localStorage.posiciones = JSON.stringify(posicionGEO);
      //Marcamos el último punto que teníamos guardado
      map.addMarker({lat: lat, lng:lng});
      geolocalizar();
      location.reload();
    };

    function cargar(){
      //Recuperamos las posiciones almacenadas
      posicionGEO = JSON.parse(localStorage.posiciones);
      //Pasamos el primer valor
      lat = posicionGEO[0][0];
      lng = posicionGEO[0][1];

      map = new GMaps({ el: '#map', lat: lat, lng: lng, click: enlazarMarcador, tap: enlazarMarcador });
      map.addMarker({lat: posicionGEO[0][0], lng: posicionGEO[0][1]});
      //Recorremos todo el array para sacar el resto de puntos
      for (var i = 1; i < posicionGEO.length; i++) {
        map.drawRoute({
          origin: [posicionGEO[i-1][0], posicionGEO[i-1][1]],
          destination: [posicionGEO[i][0], posicionGEO[i][1]],
          travelMode: 'driving',
          strokeColor: '#ff0000',
          strokeOpacity: 0.6,
          strokeWeight: 4
        });
        //Marcamos el punto obtenido en el mapa y pasamos su valor a las variables lat y lng para que sean el origen para el siguiente
        map.addMarker({lat: posicionGEO[i][0], lng: posicionGEO[i][1]});
        lat = posicionGEO[i][0];
        lng = posicionGEO[i][1];
      };
    };

    function geolocalizar(){
      GMaps.geolocate({
        success: function(position){
          lat = position.coords.latitude;  // guarda coords en lat y lng
          lng = position.coords.longitude;
          posicionGEO = [];
          map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
            el: '#map',
            lat: lat,
            lng: lng,
            click: enlazarMarcador,
            tap: enlazarMarcador
          });
          posicionGEO.push([lat,lng]);
          localStorage.posiciones = JSON.stringify(posicionGEO);
          map.addMarker({ lat: lat, lng: lng});  // marcador en [lat, lng]
        },
        error: function(error) { alert('Ahí un error en la Geolocalización: '+error.message); },
        not_supported: function(){ alert("Su navegador no soporta geolocalización, o no a brindado los permisos para que la geolocalización funcione"); },
      });
    };

    $("#restablecer").on('click', reiniciar);
    $("#simplificar").on('click', compactar);

    if (localStorage.posiciones.length != 0) { cargar();} else {geolocalizar();};
  });
