<template>
  <div id="totalView">
    <v-row
      v-for="n in 1"
      :key="n"
    >
      <v-col
        v-for="k in n+2"
        :key="k"
        :cols="width_cols[k]"
      >
      <div v-if="k === 1">

        <div v-if="data_dashboard[1].cant_datos < 16">
          <selectGraph
            :selected_graph="data_dashboard[0].selected"
            :data_properties = "{
              icon: 'mdi-information',
              title: 'Participación DOM',
              data_list: data_dashboard[0].data_list,
              width_chart: 300,
              height_chart:300,
              height_card:340
            }"
          />
        </div>
        <div v-else>
          <selectGraph
          :selected_graph="data_dashboard[0].selected"
          :data_properties = "{
            icon: 'mdi-information',
            title: 'Participación DOM',
            data_list: data_dashboard[0].data_list,
            width_chart: 315,
            height_chart:315,
            height_card:195
            }"
          />  
        </div>
                
        <selectGraph
          class="mt-3"
          :selected_graph="data_dashboard[1].selected"
          :data_properties="{
            icon:'mdi-information',
            title:'Participación DOM',
            subtitle:'Regional',
            data_list:data_dashboard[1].data_list,
            height_card:'100%'
          }"
        /> 
      </div>
      <div v-if="k === 2">
        <selectGraph 
        :selected_graph="data_dashboard[2].selected"
        :data_properties="{
            icon: 'mdi-human-male-female',
            title: data_dashboard[2].variable,
            var_1: data_dashboard[2].variable,
            data_var_1: format(data_dashboard[2].total),
            data_list: data_dashboard[2].data_list,
            options:['Mayor cantidad','Menor cantidad'],
            tipo_data:'Funcionarios',
            height_card: 340,
            height_chart:330
          }"
        />
        <selectGraph 
          class="mt-3"
          :selected_graph="data_dashboard[3].selected"
          :data_properties="{
            icon:'mdi-information',
            title:data_dashboard[3].variable,
            subtitle:'',
            data_list:data_dashboard[3].data_list,
            width_chart: 335,
            height_card:200,
            height_chart:335,
          }"
        />

        <v-row>
          <v-col cols=7>
            <selectGraph
            class="mt-3" 
              :selected_graph = "data_dashboard[4].selected"
              :data_properties = "{
                icon: 'mdi-information',
                title: data_dashboard[4].variable,
                subtitle: 'DOM sin PRC',
                data_list: data_dashboard[4].data_list,
                height_card: 240,
                height_chart: 200
              }"
            />                  
          </v-col>
          <v-col cols=5>
             <selectGraph 
             class="mt-3"
              :selected_graph="data_dashboard[5].selected"
              :data_properties="{
                icon:'mdi-information',
                title:data_dashboard[5].variable,
                subtitle:data_dashboard[5].variable,
                data_list:data_dashboard[5].data_list,
                height_card:240,
                height_chart:180
              }"  
            />
          </v-col>
        </v-row>            
      </div>
      <div v-if="k === 3">
        <v-row>
          <v-col
            cols=5
          >
            <selectGraph 
              :selected_graph="data_dashboard[6].selected"
              :data_properties="{
                icon:'mdi-office-building',
                title:data_dashboard[6].variable,
                subtitle:'',
                data_list:data_dashboard[6].data_list,
                width_chart: 315,
                height_card:300,
                height_chart:315,
              }"
            />
          </v-col>
          <v-col cols=7>
            <selectGraph 
              :selected_graph="data_dashboard[7].selected"
              :data_properties="{
                  icon: 'mdi-office-building',
                  title: data_dashboard[7].variable,
                  var_1: '',
                  data_var_1: '',
                  data_list: data_dashboard[7].data_list,
                  tipo_data:'Ranking',
                  options:['Mejor Infraestructura','Peor Infraestructura'],
                  height_card: 300,
                  height_chart:320
                }"
              />
            
          </v-col>
        </v-row>
        <!-- capacitacion -->
        <v-row style="margin-top:-5px;">
          <v-col>
            <div v-if="data_dashboard.length === 10">
              <selectGraph

                :selected_graph="'doble_chart_select'"
                :data_properties="{
                  data_var_1:data_dashboard[8],
                  data_var_2:data_dashboard[9],
                  icon:'mdi-school',
                  title: 'Capacitación',
                  height_card:490,
                  height_chart:380,
                  width_chart:790,
                }"
              />
            </div>
            <div v-else>
              <selectGraph 
                :selected_graph="data_dashboard[8].selected"
                :data_properties="{
                  icon:'mdi-school',
                  title: data_dashboard[8].variable,
                  data_list: data_dashboard[8].data_list,
                  height_card:490,
                  height_chart:420,
                  width_chart:790,
                }"  
              />
            </div>
          </v-col>
        </v-row>       
      </div>
      <!--  <div v-for="item in data_dashboard"> -->

       <!-- </div> -->
      </v-col>
    </v-row>
    
  </div>
</template>



<script>
import selectGraph from '../components/dashboardComponents/selectGraph.vue';

import {formatCL} from '../functions/functions.js';


export default {

  name: 'totalView',
  components:{
    selectGraph, 
  },
  props:[
    'data_dashboard',
    'cant_datos',
    'cols',

  ],
  data () {
    return {
      width_cols:{
      '1':3,
      '2':3,
      '3':6
      },
    }
  },
  methods:{
    format(value){
      return formatCL(value);
    }
  }
  
}
</script>

<style lang="css" scoped>
</style>