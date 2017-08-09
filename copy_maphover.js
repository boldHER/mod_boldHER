var totalPlaces = [];
var rowInfo =[];
var sheetURL = '1fwOXaHfSViMgZQ1QHREi_giBILnbOFC40zUoom4UwmA';

Tabletop.init( {key: sheetURL, callback: convertToGeoJSON, simpleSheet: true } );

function convertToGeoJSON(data) {
  console.log(data);
    for (var i = 0; i < data.length; i++){
        rowInfo = [];
        rowInfo.push(data[i]["state"]);
        rowInfo.push(data[i]["city"]);
        rowInfo.push(data[i]["homepage"]);
        rowInfo.push(data[i]["donation"]);
        rowInfo.push(data[i]["organization"]);
        rowInfo.push(data[i]["description"]);
        rowInfo.push(data[i]["lat"]);
        rowInfo.push(data[i]["lng"]);
        rowInfo.push(data[i]["address"]);
        rowInfo.push(data[i]["loctype"]);

        totalPlaces.push(rowInfo);
    }
    test();
};

function test(){
  initMap();
}


function initMap(){
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWFraGFyZSIsImEiOiJjajV1MzY0NnYwMDVjMzJzM2cyNmpwNGp6In0.QtGI8sxFE3lG3k-Gg6oB4g';
  var map = L.mapbox.map('map', 'mapbox.streets').setView([37.8, -96], 4);

  // statesData comes from the 'us-states.js' script included above
  var statesLayer = L.geoJson(statesData,  {
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);

for (var index = 0; index < totalPlaces.length; index++){
  var type = totalPlaces[index][9];
  console.log(type);
  if (type == "EE"){
    type = "college";
  } 
  else if (type == "Health"){
    type = "heart";
    console.log("Is this health?")
  }

  var geojson = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [totalPlaces[index][7], totalPlaces[index][6]]
      },
     properties: {
      title: totalPlaces[index][4] + " |  " + totalPlaces[index][9], 
       "description": totalPlaces[index][5] + "<p><a href= " + totalPlaces[index][3] + "\"title=\"Opens in a new window\">Donate<br></a>" + "<a href= " + totalPlaces[index][2] + "\"title=\"Opens in a new window\">See Website</a></p>",
      'marker-symbol': type,   
      'url': totalPlaces[index][3]
    }
    },
  ];
  var myLayer = L.mapbox.featureLayer().setGeoJSON(geojson);
  myLayer.layout = {
    "layout": {
       "icon-image": type + "-15",
      "icon-allow-overlap": true
    }
  };
  myLayer.addTo(map);
  //mapGeo.scrollWheelZoom.disable();
} 

  var popup = new L.Popup({ autoPan: false});

  function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 0.7,
          fillColor: getColor(feature.properties.density)
      };
  }

  // get color depending on population density value
  function getColor(d) {
      return d > 1000 ? '#8c2d04' :
          d > 500  ? '#cc4c02' :
          d > 200  ? '#ec7014' :
          d > 100  ? '#fe9929' :
          d > 50   ? '#fec44f' :
          d > 20   ? '#fee391' :
          d > 10   ? '#fff7bc' :
          '#ffffe5';
  }

  function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }

  var closeTooltip;

  function mousemove(e) {
    
    var layer = e.target;

    for(var i = 0; i < totalPlaces.length; i++)
    {
        var statename = layer.feature.properties.name;
        var stateaddress = layer.feature.properties.address;
        if(statename == totalPlaces[i][0])
        {
        //   console.log("there are places here with programs!");
           var density = layer.feature.properties.density;
           layer.feature.properties = 
           {
               "name" : statename,
               "density" : density,
           };

        }
    }
      
      popup.setLatLng(e.latlng);
      popup.setContent('<div class="marker-title">' + layer.feature.properties.name + '</div>');

    //  if (!popup._map) popup.openOn(map);
      //window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 3,
          opacity: 0.3,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      statesLayer.resetStyle(e.target);
     // closeTooltip = window.setTimeout(function() {
       //   map.closePopup();
      //}, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }
// add markers to map
















}
// // console.log(totalPlaces);









// mapboxgl.accessToken = 'pk.eyJ1IjoiYWFraGFyZSIsImEiOiJjajV1MzY0NnYwMDVjMzJzM2cyNmpwNGp6In0.QtGI8sxFE3lG3k-Gg6oB4g';
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: [-100.486052, 37.830348],
//     zoom: 2
// });

// map.on('load', function () {
//     map.addSource("states", {
//         "type": "geojson",
//         "data": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
//     });

//     map.addLayer({
//         "id": "state-fills",
//         "type": "fill",
//         "source": "states",
//         "layout": {},
//         "paint": {
//             "fill-color": "#627BC1",
//             "fill-opacity": 0.5
//         }
//     });

//     map.addLayer({
//         "id": "state-borders",
//         "type": "line",
//         "source": "states",
//         "layout": {},
//         "paint": {
//             "line-color": "#627BC1",
//             "line-width": 2
//         }
//     });

//     map.addLayer({
//         "id": "state-fills-hover",
//         "type": "fill",
//         "source": "states",
//         "layout": {},
//         "paint": {
//             "fill-color": "#627BC1",
//             "fill-opacity": 1
//         },
//         "filter": ["==", "name", ""]
//     });

//     // When the user moves their mouse over the states-fill layer, we'll update the filter in
//     // the state-fills-hover layer to only show the matching state, thus making a hover effect.
//     map.on("mousemove", "state-fills", function(e) {
//         map.setFilter("state-fills-hover", ["==", "name", e.features[0].properties.name]);
//     });

//     // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
//     map.on("mouseleave", "state-fills", function() {
//         map.setFilter("state-fills-hover", ["==", "name", ""]);
//     });
// });


// var totalPlaces = [];

// var sheetURL ="1PMQRMQxMetcbU4BYWdpMb-Vp6QkGftziezpPeqmmtPk";
// Tabletop.init( {key: sheetURL, callback: convertToGeoJSON, simpleSheet: true } );

// function convertToGeoJSON(data) {
//     for (var i = 0; i < data.length; i++){
//         var rowInfo = [];
//         rowInfo.push(data[i]["state"]);
//         rowInfo.push(data[i]["city"]);
//         totalPlaces.push(rowInfo);
//         console.log(totalPlaces);
//     }
// }

/*
// // console.log(totalPlaces);
L.mapbox.accessToken = 'pk.eyJ1IjoiYWFraGFyZSIsImEiOiJjajV1MzY0NnYwMDVjMzJzM2cyNmpwNGp6In0.QtGI8sxFE3lG3k-Gg6oB4g';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([37.8, -96], 4);

  var popup = new L.Popup({ autoPan: false });

  // statesData comes from the 'us-states.js' script included above
  var statesLayer = L.geoJson(statesData,  {
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);

  function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 0.7,
          fillColor: getColor(feature.properties.density)
      };
  }

  // get color depending on population density value
  function getColor(d) {
      return d > 1000 ? '#8c2d04' :
          d > 500  ? '#cc4c02' :
          d > 200  ? '#ec7014' :
          d > 100  ? '#fe9929' :
          d > 50   ? '#fec44f' :
          d > 20   ? '#fee391' :
          d > 10   ? '#fff7bc' :
          '#ffffe5';
  }

  function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }

  var closeTooltip;

  function mousemove(e) {
      var layer = e.target;

      popup.setLatLng(e.latlng);
      popup.setContent('<div class="marker-title">' + layer.feature.properties.name + '</div>' +
          layer.feature.properties.density + ' people per square mile');

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 3,
          opacity: 0.3,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      statesLayer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }

  map.legendControl.addLegend(getLegendHTML());

  function getLegendHTML() {
    var grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [],
    from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<li><span class="swatch" style="background:' + getColor(from + 1) + '"></span> ' +
        from + (to ? '&ndash;' + to : '+')) + '</li>';
    }

    return '<span>People per square mile</span><ul>' + labels.join('') + '</ul>';
  }
*/
