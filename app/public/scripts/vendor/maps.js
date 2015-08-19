var map;
var display;
var service = new google.maps.DirectionsService();
//Directions API - 2500 requests/day.
//Google Maps JavaScript API v3 - 25000 requests/day - $0.50 para cada 1000 carregamentos excedentes de mapas.

//div onde vai ficar o mapa deve ter o id 'map_canvas'.

function initialize(d, styles, mapOptions){
  display = d;
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);

  display.setMap(map);
  map.mapTypes.set('map_style',styledMap);
  map.setMapTypeId('map_style');
}

function initialize(position) {
        var mapOptions = {
          center: position,
          panControl: false,
          zoom: 19,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

        display = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#0000ff'
      }
    });

display.setMap(map);

var marker = new google.maps.Marker({
          position: position,
          map: map,
          title:"Gracinha"
        });

      }

function initializeHUE(background, roads, text, route, startPosition, markPosition){
    //Funcao para inicializar um mapa passando valores HUE no background.
    //Recebe a cor do background, a cor das ruas, a cor dos textos, a cor das rotas, uma posicao inicial e uma posicao de um marcador.

    display = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: route
      }
    });

    // Create an array of styles.
      var styles = [
      {
        stylers: [
          { hue: background },
          { saturation: -20 }
        ]
        },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" },
          {color: roads}
        ]
        },{
        featureType: "all",
        elementType: "labels.text",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" },
          {color: text}
        ]
      }
      ];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

      // Create a map object, and include the MapTypeId to add
      // to the map type control.
      var mapOptions = {
        zoom: 17,
        center: startPosition,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };

      map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

      display.setMap(map);

      //Creating a new Marker object.
      //if(markPosition != null){
        var marker = new google.maps.Marker({
          position: markPosition,
          map: map,
          title:"Teste"
        });
      //}

      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

}

function initializeColor(background, roads, text, route, startPosition, markPosition){
    //Funcao para inicializar um mapa passando valores RGB no background.
    //Recebe a cor do background, a cor das ruas, a cor dos textos, a cor das rotas, uma posicao inicial e uma posicao de um marcador.

    display = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: route
      }
    });

    // Create an array of styles.
      var styles = [
      {
        stylers: [
          { color: background },
          { saturation: -20 }
        ]
        },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" },
          {color: roads}
        ]
        },{
        featureType: "all",
        elementType: "labels.text",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" },
          {color: text}
        ]
      }
      ];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

      // Create a map object, and include the MapTypeId to add
      // to the map type control.
      var mapOptions = {
        zoom: 17,
        center: startPosition,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };

      map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

      display.setMap(map);

      //Creating a new Marker object.
      //if(markPosition != null){
        var marker = new google.maps.Marker({
          position: markPosition,
          map: map,
          title:"Teste"
        });
      //}

      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

}

function tracert(from, to, points){
  //Funcao para tracar uma rota no mapa.
  //Recebe o ponto de partida, o ponto de chegada e um array de pontos por onde passar entre a partida e a chegada.

  var request = {
    origin: from,
    destination: to,
    waypoints: points,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  service.route(request, function(result,status){
    if(status == google.maps.DirectionsStatus.OK){
      display.setDirections(result);
    }
  });
}

function tracert2(from, to, points){
  //Funcao para tracar uma rota no mapa.
  //Recebe o ponto de partida, o ponto de chegada e um array de pontos por onde passar entre a partida e a chegada.

  var request = {
    origin: from,
    destination: to,
    waypoints: points,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  service.route(request, function(result,status){
    if(status == google.maps.DirectionsStatus.OK){
      display.setDirections(result);
      $('.route_not_found').slideUp("slow");
      return 1;
    }else{
      $('.route_not_found').html("Não foi possível encontrar: <span>" + from + "</span>");
      $('.route_not_found').slideDown("slow");
      display.setDirections({routes: []});
    }
  });
}

function tracertOptions(request){
  service.route(request, function(result,status){
    if(status==google.maps.DirectionsStatus.OK){
      display.setDirections(result);
    }
  });
}

function infoBoxOptions(options, markerPos){
  var marker2 = new google.maps.Marker({
   map: map,
   draggable: false,
   position: markerPos,
   visible: true
  });

  var ib = new InfoBox(options);
  ib.open(map,marker2);

  google.maps.event.addListener(marker2, "click", function (e){
    if(ib.isHidden){
      ib.open(map,this);
      ib.isHidden = false;
    }else{
      ib.close();
      ib.isHidden = true;
    }
  });

}

function infoBoxNoMarker(options){
  var ib = new InfoBox(options);
  ib.open(map);

  google.maps.event.addListener(marker2, "click", function (e){
    if(ib.isHidden){
      ib.open(map,this);
      ib.isHidden = false;
    }else{
      ib.close();
      ib.isHidden = true;
    }
  });
}

function infoBox(markerPos, content, background, opacity, width){
  //Funcao para criar uma infoBox personalizada na posicao de um marcaddor.
  //Recebe a posicao do marcador, o conteudo da infobox, a cor de fundo da infobox, a opacidade da infobox e a largura da infobox.
  var marker2 = new google.maps.Marker({
   map: map,
   draggable: false,
   position: markerPos,
   visible: true
  });

  if(width!= null){
    var w = width + "px";
    var w2 = -width/2;
  }else{
    var w = 0 + "px";
    var w2 = -0/2;
  }

  var opt = {
    content: content,
    disableAutoPan: false,
    maxWidth: 0,
    pixelOffset: new google.maps.Size(w2, 0),
    zIndex: null,
    boxStyle: {
      background: background,
      opacity: opacity,
      width: w,
    },
    closeBoxURL: "",
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
  };

  google.maps.event.addListener(marker2, "click", function (e) {
    if(ib.isHidden){
      ib.open(map, this);
      ib.isHidden= false;
    }
    else{
      ib.close();
      ib.isHidden = true;
    }
    });

  var ib = new InfoBox(opt);
  ib.open(map,marker2);

}

function getMap(){
  return map;
}

function createMarker(position, title){
  var marker = new google.maps.Marker({
   map: map,
   draggable: false,
   position: position,
   visible: true,
   title: title
  });
}
