<template>
	<div id="map">
			<div id="mapContainer" class="basemap"></div>
	</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {

  name: 'mapa_regiones',
  props:[
  	'data_regiones','data_comunas'
  ],
  data () {
    return {
    	accessToken: 'pk.eyJ1IjoibGFiZGV2MjIiLCJhIjoiY2tzaHFvamRtMXdwZDJ1b2E2ZHRrMDNvYyJ9.A2-aL3_dJ9BIK26yO0Ahug',
    	selected_region:0,
    	mapa_: null
    }
  },
  mounted(){
  	mapboxgl.accessToken = this.accessToken;

  	//Constantes iniciales
  	const region_i = this.data_regiones.filter(region => region.numero_region == 1);
  	const coordinates_i = region_i[0].coordinates;

  	const mapa = new mapboxgl.Map({
  		container:"mapContainer",
  		style:"mapbox://styles/mapbox/light-v10",
  		center:[-69.8886099, -18.582377],
		zoom:8.1
  	});

  	this.mapa_ = mapa;

  	this.mapa_.addControl(new mapboxgl.NavigationControl());

  	// console.log(this.data_comunas[0])
  	this.addRegionData(this.mapa_);
  	this.addComunasData(this.mapa_);
  	this.addLayerRegiones(this.mapa_);
  	this.addLayerComunas(this.mapa_);
  	
  },
  methods:{
		get_zoom_region(codigo_region){
        
      const zoom_regiones = {
        1: 5.5,
        2:5.5,
        3:5.5,
        4:6,
        5:6.5,
        6:6.5,
        7:6.5,
        8:6.5,
        9:6,
        10:5.5,
        11:5,
        12:5,
        13:7,
        14:6.5,
        15: 7,
        16: 7
      }

      let codigo = parseInt(codigo_region);

      let zoom =  zoom_regiones[codigo];

      return zoom;
    },

  	cambiarRegion(item,i,mapa){
  		this.selected_region = i;
  		const coordinates = item.coordinates;
  		const numero_region = item.numero_region;
  		const zoom_region = this.get_zoom_region(numero_region);
  		
  			mapa.flyTo({
					center: coordinates,
					zoom:zoom_region
				});
  	},

  	addRegionData(mapa){
  		mapa.on('load', () => {

  			mapa.addSource('mapa_regiones',{
  				type: 'vector',
  				url: 'mapbox://labdev22.azm906hb',
				
  			});

  		});
  	},

  	addComunasData(mapa){
  		mapa.on('load', () => {

  			const data_comunas = this.data_comunas;

  			mapa.addSource('mapa_comunas',{
  				type: 'geojson',
  				data:{
  					type: 'FeatureCollection',
  					features: data_comunas
  				}
  			})

  		});
  	},

  	addLayerComunas(mapa){
  		mapa.on('load', () => {

  			mapa.addLayer({
          id:'comunas',
          source:'mapa_comunas',
          type: 'circle',
          paint: {
            'circle-radius':5,
            'circle-color': '#3ABB5C',
            'circle-stroke-width': 1,
          },
          // "filter": ['all',["==", "nombre", nombre_comuna]]

        });

        // mapa.on('click','comunas', (e) => {
        // 	mapa.flyTo({
        // 		center: e.features[0].geometry.coordinates
        // 	})
        // });

        const popup = new mapboxgl.Popup({
					closeButton: false,
					closeOnClick: false,
					className:"dark"
				});


        mapa.on('mouseenter', 'comunas', (e) => {
					mapa.getCanvas().style.cursor = 'pointer';

					const coordinates = e.features[0].geometry.coordinates.slice();


					const nombre_comuna = e.features[0].properties.nombre;
					const data_file = JSON.parse(e.features[0].properties.data_file);
					const description = `
					<div class="fondo_oscuro">
						<div class="black--text">Productor: ${data_file['nombre_productor']}</div>
						<div class="black--text">Región: ${data_file['region']}</div>
						<div class="black--text">Comuna: ${data_file['ubicacion']}</div>
						<div class="black--text">Distancia de Arica: ${data_file['distancia_arica']}</div>
						<div class="black--text">Productos: ${data_file['productos']}</div>
					</div>
					`;


					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					popup.setLngLat(coordinates).setHTML(description).addTo(mapa);

				});
				 
				// Change it back to a pointer when it leaves.
				mapa.on('mouseleave', 'comunas', () => {
					mapa.getCanvas().style.cursor = '';
					popup.remove();
				});

  		});
  	},

  	 formatCOD(codigo_region){
      let codigo;
      var tipo = String(codigo_region).length;
      if(tipo == 1){
        if(codigo_region == 8){
          codigo = '08';
        }
        else{
          codigo = '0000'+String(codigo_region);
        }
      }
      else if(tipo == 2){
        if(codigo_region == 16){
          codigo = '16';
        }
        else{
          codigo = '000'+String(codigo_region)
        }
      }

      return codigo;
    },

  	addLayerRegiones(mapa){
  		mapa.on('load', () => {

  			const regiones = this.data_regiones;
  			let region;
  			let codigo_region;
  			let color_region;

  			for (region of regiones){
  				codigo_region = this.formatCOD(region.numero_region);
  				color_region = region.color_region;

  				mapa.addLayer({
	  				id: 'mapa_region_'+codigo_region,
	  				source: 'mapa_regiones',
	  				'source-layer':'chile_regiones_comunas-6uwztq',
	  				type: 'fill',
	  				paint: {
	            'fill-color': color_region,
	            'fill-opacity': 0.4,
	            'fill-outline-color': ' #00194c'
	          },
	          filter: ["==", "codigo_region", codigo_region]
	  			});
  			}
  		});
  	}
  }
}
</script>

<style lang="scss" scoped>

.basemap {
	width: 100%;
	height: 68vh;
	margin: 0;
}
</style>

