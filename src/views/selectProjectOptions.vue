<template>
	<div>
    <div id="header">
      <v-app-bar color="blue darken-2" class="rounded" flat dark>
        <h2 class="font-weight-medium">Gráficos</h2>
      </v-app-bar>
    </div>
    <div id="body">
      <v-card class="fill-height" height=810 flat>
        <v-card-title class="font-weight-medium headline">
          Proyecto: {{nombre_proyecto}}
        </v-card-title>
        <v-card-subtitle class="font-weight-medium title mt-0">
          Datos disponibles
          <div v-if="data_total.length > 1" class="mt-2">
             <div >
                <v-slide-group
                v-model="selected_option"
                >
                <v-slide-item
                  v-for="(item,i) in categorias"
                  :key="i"
                  v-slot:default="{ active, toggle }"
                >
                  <v-btn
                    dark
                    class="ma-1"
                    :color="active ? 'indigo darken-2' : 'blue darken-1'"
                    @click="onCardClick(item,i)"
                  >
                    {{item}}
                  </v-btn>
                </v-slide-item>
              </v-slide-group>
            </div>
          </div>
           <div v-if="data_total.length === 1">
            Solo un tipo de data total
          </div>
        </v-card-subtitle>
        <v-card-text>
          <h3 class="font-weight-medium">
            Seleccione un gráfico para cada dato disponible
          </h3>
          <div
            class="mt-5"
            v-for="(dato_chart,n) in data_charts"
            :key="n"
          >
            <v-alert
            border="left"
            dark
            color="indigo darken-1"
            elevation="2"
            dense
            height=60
            v-if="dato_chart.selected !== 'ranking' && 
                  dato_chart.selected != 'simple_ranking' &&
                  dato_chart.selected != 'card_ranking' &&
                  dato_chart.selected != 'no_chart' &&
                  dato_chart.selected != 'card_list' &&
                  dato_chart.selected != 'stack_column'"

            >

              <v-row>
                <v-col cols=4>
                  <div style="display:inline-block;" class="mt-1">
                    <v-icon style="margin-top:-6px;">
                      mdi-file
                    </v-icon>
                    <span  class="ml-4 font-weight-medium title">
                      {{dato_chart.variable}}
                    </span>
                  </div>
                </v-col>
                <v-col cols=8 style="margin-top:-15px;">
                  <v-radio-group
                    v-model="dato_chart.selected"
                    row
                    mandatory
                  >
                    <v-radio
                      v-for="(option_chart,i) in dato_chart.charts"
                      :key="i"
                      class="px-3"
                      :value="option_chart"
                    >
                      <template v-slot:label>
                        <div>
                          <v-icon style="margin-top:-5px;" large>
                            {{charts[option_chart].icon}}
                          </v-icon>
                          <strong class="ml-2 title" >
                            {{charts[option_chart].text}}
                          </strong>
                        </div>
                      </template> 
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
          </div>
          <div v-if="loading">
            <v-progress-circular
              indeterminate
              color="teal"
              :size="50"
              class="mt-2 ml-2"
            ></v-progress-circular>
          </div>
          <div v-if="loading === false">
            <v-btn
              color="teal"
              dark
              class="mr-4"
              @click="generarDashboards(new_proyectos)"
            >
              Generar Dashboard
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
	</div>
</template>

<script>
import axios from 'axios';
const API_URL = 'https://api.agro.datari.site'


export default {

  name: 'selectProjectOptions',
  props: [
  	'data_proyecto',
  	'nombre_proyecto',
  	'numero_proyecto',
    'new_proyectos',
    'user_id'

	],
  data () {
    return {
      charts:{
        donut:{
          icon: 'mdi-chart-donut',
          text: 'Donut'
        },
        pie:{
          icon:'mdi-chart-pie',
          text: 'Pie'
        },
        column:{
          icon:'mdi-chart-bar',
          text: 'Column'
        },
        fill_column:{
          icon:'mdi-chart-bar-stacked',
          text: 'FillColumn'
        },
        tree_map:{
          icon:'mdi-chart-tree',
          text:'TreeMap'
        }       
      },
      categorias:null, 
      selected_option:0,
      data_total:null,
      data_charts:[],
      loading:false,
      proyectos_test:[]
    }
  },
  created(){
  	// console.log(this.data_proyecto.data_libros)
  	if (this.data_proyecto !== undefined){
      this.data_total = this.data_proyecto.data_libros[0].data_total
      this.categorias = this.get_categorias(this.data_total);
      this.data_charts = this.get_available_charts(this.data_total, this.selected_option)
      
  	}
  	else{
  		console.log(this.data_proyecto)
  		//back to a new proyect if no project require is made.
  		 this.$router.replace({path:'/projects/new_project/'})
  	}
  },
  methods:{
    get_categorias(data_from_file){
      let element;
      let list_categorias =[];
      for (element of data_from_file){
        let tipo = element.tipo;
        list_categorias.push(tipo)
      }

      return list_categorias;
    },

    get_available_charts(data_from_file,selected_option){
      
      let data_selected = data_from_file[selected_option].data;
      return data_selected

    },

    onCardClick(item,n){
      let selected = item.value;
      this.selected_option = n ;
      this.data_charts = this.get_available_charts(this.data_total, this.selected_option)
    },


    generarDashboards(){
      
      let nombre = this.nombre_proyecto;
      let nombre_file = this.data_proyecto.archivo;
      let user_id = this.user_id;
      let data_json_to_save = this.data_proyecto
      let data_project = {
        nombre: nombre,
        nombre_file: nombre_file,
        file_json: data_json_to_save,
        owner_id: user_id
      }

      try{
        this.loading = true;
        this.guardarProyecto(data_project);

        this.sleep(5).then(() => {
          //existen más proyectos
          this.$emit('update',true);
          this.$router.replace({
            name: 'FileView', 
            params: {
              'data':this.data_proyecto,
              'numero_proyecto':this.numero_proyecto, 
              'url_dashboard': 'dash_1'}
          });
          // location.reload() 
        });

      }catch(err){
        this.loading = false;
        console.log(err)
      }
    },

    sleep(s) {
      return new Promise(resolve => setTimeout(resolve, s*1000));
    },

  }
}
</script>

<style lang="css" scoped>
</style>