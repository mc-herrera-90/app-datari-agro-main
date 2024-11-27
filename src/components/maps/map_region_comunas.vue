<template>
	<v-card flat>
    
	  <div id="Info">
      <div class="px-1" style="display:inline;">
        Comuna: 
        <h3 style="display:inline;" class="font-weight-bold">
        <span id='comuna'></span>
        </h3>
      </div>
      <div class="px-1">
        {{attr_1}}:
        <h3 style="display:inline;" class="font-weight-bold">
          <span id='attr_1'></span>
        </h3>
      </div>
    <!--   <div class="px-1"><strong>{{attr_2}}:</strong> <span id='attr_2'></span></div>
      <div class="px-1"><strong>{{attr_3}}:</strong> <span id='attr_3'></span></div> -->

    </div>
    <div id="mapContainer" class="basemap"></div>
      <!-- <div id="mapContainer" class="basemap"></div> -->
  
	</v-card>
</template>


  
<script>
import mapboxgl from "mapbox-gl";

export default {

  name: 'map_region_comunas',
  props:['data','nombre_comuna'],
  components:{
  },
  data () {
    return {
    	accessToken: 'pk.eyJ1IjoibGFiZGV2MjIiLCJhIjoiY2tzaHFvamRtMXdwZDJ1b2E2ZHRrMDNvYyJ9.A2-aL3_dJ9BIK26yO0Ahug',
      attr_1:null,
      attr_2:null,
      attr_3:null,
    }
  },
  mounted(){
    let data_region = this.data.data_region;
    let data_comunas = this.data.data_comunas;
    this.crear_mapa_region(data_region,data_comunas);
    // this.add_layers(this.nombre_comuna,cod_region,data_comunas,map);
  },
  computed: {
    updateData () {
      return this.data;
    },
    updateComuna(){
    	return this.nombre_comuna
    }
  },
  watch: {
    updateData(newData,oldData){

      let data_region_old = oldData.data_region;
      let codigo_region_old = this.formatCOD(data_region_old.numero_region)

      let data_region = newData.data_region;
      let data_comunas = newData.data_comunas;

      this.crear_mapa_region(data_region,data_comunas);

      // if( this.mapa != null){

      //   if (this.mapa.getLayer('region'+codigo_region_old)) {
      //     console.log('xdddddd')
      //     this.mapa.removeLayer('region'+codigo_region_old);
      //   }
      //   this.addRenderRegionLayer(codigo_region,this.mapa);
      //   this.mapa.flyTo({
      //     center: coordinates_region,
      //     zoom: zoom_region,
      //     essential: true
      //   });
      // }



    	// const map = this.create_basemap(coordinates_region,zoom_region);
     //  this.add_layers(this.nombre_comuna,cod_region,data_comunas,map);

    },

    updateComuna(){

      let data_region = this.data.data_region;
      let data_comunas = this.data.data_comunas;

      this.crear_mapa_region(data_region,data_comunas);
    }

  },
  methods: {

    crear_mapa_region(data_region,data_comunas){
      let coordinates_region = data_region.coordinates;
      let cod_region = this.formatCOD(data_region.numero_region);
      let zoom_region = this.get_zoom_region(cod_region)
      let nombre_comuna_selected  = this.nombre_comuna;
      let data_file_comuna = this.get_data_comuna_selected(nombre_comuna_selected,data_comunas);

      const mapa = this.create_basemap(coordinates_region,zoom_region);
      
      this.create_tooltip('DOM',nombre_comuna_selected,data_file_comuna)
      this.addRegionSource(mapa);
      this.addRegionLayer(cod_region,mapa);
      this.addComunas(mapa,data_comunas,nombre_comuna_selected,data_file_comuna)
      // this.addComunasLayer(mapa,nombre_comuna_selected);

    },

    get_data_comuna_selected(nombre_comuna,data_comunas){
      const data_mapa_comunas = data_comunas.find(dato => dato.properties.nombre === nombre_comuna);
      const data_file_comuna = data_mapa_comunas.properties.data_file;
      return data_file_comuna
    },

  	create_basemap(coordinates,zoom_region){
  		mapboxgl.accessToken = this.accessToken;

  		let basemap = new mapboxgl.Map({
  			container: "mapContainer",
        style: "mapbox://styles/mapbox/light-v10",
        center: coordinates,
        zoom: zoom_region,
  		});

      basemap.addControl(new mapboxgl.NavigationControl());
      basemap.addControl(new mapboxgl.FullscreenControl());

  		return basemap;
  	},

    addRegionSource(mapa){
       mapa.on('load', () => {
        mapa.addSource('map_regiones', {
          type: 'vector',
          url: 'mapbox://labdev22.azm906hb',
        });
      });
    },

    addComunas(mapa,data_comunas,nombre_comuna,data_file_comuna){
      

      mapa.on('load',() => {
        mapa.addSource('mapa_comunas',{
          type: 'geojson',
          data:{
            type: 'FeatureCollection',
            features: data_comunas
          }
        });


        mapa.addLayer({
          id:'comunas',
          source:'mapa_comunas',
          type: 'circle',
          layout: {
            'visibility':'visible'
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#5297E9',
            // [
            //   'match',
            //   ['get','nombre'],
            //   nombre_comuna,
            //   '#E53935',
            //   /* other */ '#5297E9'
            // ],
            'circle-stroke-width': 1,
          },
          "filter": ['all',["!=", "nombre", nombre_comuna]]
        });

        mapa.addLayer({
          id:'comuna',
          source:'mapa_comunas',
          type: 'circle',
          layout: {
            'visibility':'visible'
          },
          paint: {
            'circle-radius': 15,
            'circle-color': '#E53935',
            // [
            //   'match',
            //   ['get','nombre'],
            //   nombre_comuna,
            //   '#E53935',
            //   /* other */ '#5297E9'
            // ],
            'circle-stroke-width': 1.2,
          },
          "filter": ['all',["==", "nombre", nombre_comuna]]
        });

         mapa.on('mousemove','comunas',(e) => {
           mapa.getCanvas().style.cursor = 'pointer';
           let data_file_temp = JSON.parse(e.features[0].properties.data_file);
           let comuna = e.features[0].properties.nombre;
           this.create_tooltip('DOM',comuna,data_file_temp)
        });

        mapa.on('mouseleave','comunas',(e) => {
          this.create_tooltip('DOM',nombre_comuna,data_file_comuna)
          mapa.getCanvas().style.cursor = '';
        });
      });
    },

    addRegionLayer(codigo_region,mapa){
      mapa.on('load', () => {
       
        console.log(codigo_region)
        mapa.addLayer({
          id:'region'+codigo_region,
          source: 'map_regiones',
          'source-layer': 'chile_regiones_comunas-6uwztq',
          type: 'fill',
          paint: {
            'fill-color': '#5D6D7E',
            'fill-opacity': 0.4,
            'fill-outline-color': ' #00194c'
          },
          "filter": ["==", "codigo_region", codigo_region]
        });
      });
    },
    get_zoom_region(codigo_region){
        
      const zoom_regiones = {
        1: 6,

      }

      let codigo = parseInt(codigo_region);

      let zoom =  zoom_regiones[codigo];

      return zoom;
    },

    create_tooltip(tipo,comuna,data_file){
      var comunaDisplay = document.getElementById('comuna');
      var attr1Display = document.getElementById('attr_1');
      // var attr2Display = document.getElementById('attr_2');
      // var attr3Display = document.getElementById('attr_3');


      if(tipo === 'DOM'){
        comunaDisplay.textContent = comuna;
        this.attr_1 = 'Cantidad funcionarios DOM'
        attr1Display.textContent = data_file[this.attr_1];

      }
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
    }
  }
}
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 382px;
}

#Info {
  position: absolute;
  font-family: sans-serif;
  margin-top: 5px;
  margin-left: 5px;
  padding: 5px;
  width: 45%;
  border: 2px solid black;
  font-size: 14px;
  color: #000;
  background-color: black;
  border-radius: 3px;
  opacity: 0.7;
  z-index: 1;
}
</style>