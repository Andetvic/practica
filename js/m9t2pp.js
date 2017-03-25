var map, lat, lng;

$(function(){

  function enlazarMarcador(e){

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

    lat = e.latLng.lat();   // guarda coords para marca siguiente
    lng = e.latLng.lng();

    map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
  };

  function geolocalizar(){
    GMaps.geolocate({
      success: function(position){
        lat = position.coords.latitude;  // guarda coords en lat y lng
        lng = position.coords.longitude;

        map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
          el: '#map',
          lat: lat,
          lng: lng,
          click: enlazarMarcador,
          tap: enlazarMarcador
        });
        map.addMarker({ lat: lat, lng: lng});  // marcador en [lat, lng]
      },
      error: function(error) { alert('Ahí un error en la Geolocalización: '+error.message); },
      not_supported: function(){ alert("Su navegador no soporta geolocalización, o no a brindado los permisos para que la geolocalización funcione"); },
    });
  };

  geolocalizar();
});
