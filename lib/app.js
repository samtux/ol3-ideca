var projection = ol.proj.get('EPSG:4326');

var map = new ol.Map({
 target: 'map',
 layers: [
  new ol.layer.Group({ // En este grupo agregue las capas base
   'title': 'Capas base',
   layers: [
    new ol.layer.Tile({
     title: 'Mapa de referencia',
     type: 'base',
     visible: true,
     source:new ol.source.TileImage({     
      attributions: [new ol.Attribution({
       html: 'Copyright:&copy; 2015 IDECA, Mapa de Referencia'
      })],
      maxExtent: [-74.33183997179562,4.401280391084222,-73.77028717441966,4.93071046488146],
      projection: projection,
      tileGrid: new ol.tilegrid.TileGrid({
       origin: [-400,400],
       resolutions: [0.0023794610058302797,
                     0.0011897305029151398,	   
                     5.948652514575699E-4,
                     2.3794610058302794E-4,
                     1.1897305029151397E-4,
                     4.758922011660559E-5,
                     2.3794610058302794E-5,
                     1.1897305029151397E-5,
                     4.758922011660559E-6,
                     2.3794610058302796E-6,
                     1.1897305029151398E-6],
       tileSize: 256
      }),
      tileUrlFunction: function(tileCoord, pixelRatio, projection) {
       return 'http://imagenes.catastrobogota.gov.co/arcgis/rest/services/CM/CommunityMap/MapServer/tile/' +
        tileCoord[0] + '/' + (-tileCoord[2] - 1) + '/' + tileCoord[1] + '.png';
      }
     })
    }),
    new ol.layer.Tile({
     title: 'Ortofoto de Bogota',
     type: 'base',
     visible: false,       
     source: new ol.source.TileImage({
      attributions: [new ol.Attribution({
       html: 'Copyright:&copy; 2015 IDECA, Ortofoto de Bogota'
      })],
      maxExtent: [-74.900220,3.698400,-73.347648,4.912033],
      tileGrid: new ol.tilegrid.TileGrid({
       origin: [-74.900220,3.698400],
       resolutions:[0.00079369539999999983,
                    0.00031747820000000004,
                    0.00015873910000000002,
                    0.00007936954220105230,
                    0.00003174781688042089,
                    0.00001587390844021050,
                    0.00000634956337608418,
                    0.00000317478168804209,
                    0.00000158739084402105]
      }),
      tileUrlFunction: function(tileCoord) {
       var z = tileCoord[0];
       var x = tileCoord[1];
       var y = tileCoord[2]; //(1 << z) - tileCoord[2] - 1;

       if (x < 0 || y < 0) {
        return '';
       }

       var url = 'http://201.245.192.251:5521/mapcache/tms/1.0.0/ortoimagen2012@Extension/' + z + '/' + x + '/' + y + '.png';
       return url;
      }
     })
    })
   ]
  }),
  /************** 
    Inicio de las capas superpuestas
                    *********************/ 

  new ol.layer.Group({ // En este grupo agregue las capas superpuestas
   'title': 'Capas superpuestos',
   layers: [
    new ol.layer.Tile({
     title: "Vallas",
     source: new ol.source.TileWMS({
      attributions: [new ol.Attribution({
       html: '<br>Copyright:&copy; 2015 Secretaria Distrital de Ambiente de Bogota'
      })],
      url: 'http://www.secretariadeambiente.gov.co/arcgis/services/Mapas_Visor/Cal_Visual/MapServer/WMSServer',
      params: {LAYERS: '1,3,5,9,10,12,13', VERSION: '1.3.0'}
     })
    })
   ]
  })
  /************** 
    Fin de las capas superpuestas
                    *********************/ 
 ],
 view: new ol.View({
  center: [-74.13, 4.585],
  maxZoom: 20,
  minZoom: 10,
  projection: projection,
  zoom: 10,
  resolutions: [0.0007936954,
                0.0003174782,
                0.0001587391,
                7.93695422010523E-005,
                3.17478168804209E-005,
                1.58739084402105E-005,
                6.34956337608418E-006,
                3.17478168804209E-006,
                1.58739084402105E-006]
 })
});

// Crear el control de capas
var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);
