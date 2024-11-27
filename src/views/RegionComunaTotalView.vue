<template>
	<div id="totalViewRegionComuna">
    <div id="header">
       <v-app-bar color="blue darken-2" class="rounded " flat dark>
        <div>
        <h2 class="font-weight-light text-left">{{titulo}}</h2>
        </div>
        <div class="ml-6" >
          <v-slide-group
          v-model="selected_option"
          >
          <v-slide-item
            v-for="(item,i) in categorias"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? 'blue lighten-5 black--text' : 'blue darken-1 white--text'"
              class="ma-2"
              height="40"
              width="200"
              dense
              solo-inverted
              @click="onCardClick(item,i)"
            >
              <v-row
                align="center"
                justify="center"
              >
                <div class="mt-5 ">
                  <h4 class="font-weight-medium">{{item}}</h4>
                </div>
              </v-row>
            </v-card>
          </v-slide-item>
         </v-slide-group>
        </div>
        <v-spacer/>
        <div>
          <v-btn
            color="indigo darken-4"
            @click="generarMapa()"
          >
            <h4>
              Mapa de datos
            </h4>
             <v-icon right> 
              mdi-map-marker
            </v-icon>
          </v-btn>
        </div>
      </v-app-bar>
    </div>
    <div id="body" class="mt-2">
      <div v-if="selected_option === 0">
        <totalView 
          :data_dashboard="data_total_dashboard"
          :cant_datos="cant_datos_dashboard"
          :cols="cols_dashboard"
        />  
      </div>
      <div v-if="selected_option == 1">
        <totalViewVariables
          :data_dashboard="data_total_dashboard"
          :cant_datos="cant_datos_dashboard"
          :cols="cols_dashboard"
        />
      </div>
      <v-overlay 
        :value="overlay_mapa" 
        z-index=0 
        opacity="0.95" 
        absolute 
        
      >
        <div  v-if="loading_mapa">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </div>
        <div v-else>
          <div id="mapa" class="centrar">
           
                <Mapa
                  :data_regiones="data_mapa_regiones"
                  :data_comunas="data_mapa_comunas"
                />
             
          </div>
          <div id="cerrar_mapa" class="text-center">
             <v-btn
              class="white--text boton_cerrar_mapa text-center"
              color="teal"
              @click="cerrarMapa()"
              
            >
              Volver a dashboard
            </v-btn>
          </div>
          
        </div>
      </v-overlay>
    </div>    
  </div>
</template>

<style lang="css" scoped>
.centrar{
    align-items: center;
    justify-content: center;
    margin-top:0px;
}
</style>

<style type="text/css">
.boton_cerrar_mapa{
  justify-content:center;
  align-items:center;
  margin-left:0%;
  margin-top:20px;
}
</style>

<script>
import {formatCL} from '../functions/functions.js';
import selectGraph from '../components/dashboardComponents/selectGraph.vue';
import totalView from './totalView.vue';
import totalViewVariables from './totalViewVariables.vue';
import Mapa from '../components/maps/mapa_regiones.vue';



// import infoCardDoble from '../components/dashboardComponents/infoCardDoble.vue';

// import infoCardGroup from '../components/dashboardComponents/infoCardGroup.vue';
// import infoCard from '../components/dashboardComponents/infoCard.vue';


export default {

  name: 'RegionComunaTotalView',
  props:[
    'data_total','categorias','titulo',
    'data_mapa'
  ],
  components:{
    selectGraph, 
    totalView,
    Mapa,
    totalViewVariables
    // infoCard,
    // infoCardDoble,
    // infoCardGroup
  },
  data () {
    return {
      selected_option:0,
      data_total_dashboard:null,
      cant_datos_dashboard: null,
      cols_dashboard:null,
      // cambiar a false
      overlay_mapa:false,
      loading_mapa:true,
      data_mapa_comunas: [],
      data_mapa_regiones:[]
    }
  },
  created(){
    var size_data_mapa = Object.keys(this.data_mapa).length;
    var data_mapa = this.get_mapa_total(this.data_mapa);

    this.data_mapa_comunas = data_mapa.data_comunas;
    this.data_mapa_regiones = data_mapa.data_regiones;

    this.ordenarRegiones(this.data_mapa_regiones);

    this.data_total_dashboard = this.data_total[this.selected_option].data;
    this.cant_datos = this.data_total_dashboard.length;
    this.cols_dashboard = (this.cant_datos/3).toFixed(0);
   
  },
  computed: {
    updateData () {
      return this.data_total;
    }
  },
  watch:{
    updateData (){
      this.cerrarMapa();
      var data_mapa = this.get_mapa_total(this.data_mapa);
      this.data_mapa_comunas = data_mapa.data_comunas;
      this.data_mapa_regiones = data_mapa.data_regiones;

      this.data_total_dashboard = this.data_total[this.selected_option].data;
      this.cant_datos = this.data_total_dashboard.length;
      this.cols_dashboard = (this.cant_datos/3).toFixed(0);
    },

    // overlay_mapa (val) {
    //   val && setTimeout(() => {
    //     this.loading_mapa = false
    //     this.overlay_mapa =  true
    //   }, 3000)
    // },
  },
  methods:{

    ordenarRegiones(data_regiones){
      return data_regiones.sort((a,b) => (a.orden > b.orden) ? 1 : -1)
    },

    generarMapa(){
      this.overlay_mapa = !this.overlay_mapa;
      setTimeout(() => {
        this.loading_mapa = false
        
      }, 3000);
    },

    cerrarMapa(){
      this.overlay_mapa = false;
      this.loading_mapa = true;
    },

    get_mapa_total(mapa_file){
      let element;

      let array_final_comunas = [];
      let array_final_regiones = [];

      for (element in mapa_file){
        let data_mapa_file = mapa_file[element];
        let data_region = data_mapa_file.data_region;
        data_region['nombre'] = element;
        let data_comunas_region = data_mapa_file.data_comunas;
        
        array_final_regiones.push(data_region);
        array_final_comunas = array_final_comunas.concat(data_comunas_region);
      }

      return {
        data_comunas:array_final_comunas,
        data_regiones: array_final_regiones
      }
    },

    onCardClick(item,n){
      let selected = item.value;
      this.selected_option = n ;
      this.data_total_dashboard = this.data_total[this.selected_option].data;
      this.cant_datos = this.data_total_dashboard.length;
      this.cols_dashboard = (this.cant_datos/3).toFixed(0);
    },

   
    
  }
}
</script>

<style lang="css" scoped>
</style>