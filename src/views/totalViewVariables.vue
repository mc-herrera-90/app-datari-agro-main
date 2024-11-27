<template>
	<div id="totalViewVariables">
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
      	<selectGraph
	        :selected_graph="data_dashboard[0].selected"
	        :data_properties="{
	          data_list: data_dashboard[0].data_list,
	          icon:'mdi-desktop-classic',
	          width_chart: 490,
	          height_chart:300,
	          height_card: 360,
	          title:data_dashboard[0].variable
	        }"
	      />
	      <!-- Cambiar list_repeticiones por data_list -->
	      <selectGraph
          class="mt-3"
          :selected_graph="data_dashboard[1].selected"
          :data_properties="{
            height_card: 430,
            height_chart:350,
            width_chart:520,
            title: data_dashboard[1].variable,
            icon: 'mdi-desktop-classic',
            data_list: data_dashboard[1].data_list
          }"
        />
      </div>
      <div v-if="k == 2">
      	<selectGraph 
          :selected_graph="data_dashboard[2].selected"
          :data_properties="{
            icon: 'mdi-desktop-classic',
            title: data_dashboard[2].variable,
            var_1: data_dashboard[2].variable,
            data_var_1: format(data_dashboard[2].total),
            data_list:data_dashboard[2].data_list,
            tipo_data: 'computadores',
            options:['Mayor cantidad','Menor cantidad'],
            height_card:360,
            height_chart:330
          }"
        />
        <selectGraph 
              class="mt-3"
              :selected_graph="data_dashboard[4].selected"
              :data_properties="{
                height_card:430,
                height_chart:350,
                width_chart:400,
                title:data_dashboard[4].variable,
                icon:'mdi-desktop-classic',
                data_list: data_dashboard[4].data_list
              }"
        />

      	<!-- {{data_dashboard[4]}}
      	{{data_dashboard[7]}} -->
      </div>
      <div v-if="k == 3">
      	<selectGraph
          :selected_graph="data_dashboard[5].selected"
          :data_properties="{
            icon:'mdi-desktop-classic',
            title:data_dashboard[5].variable,
            data_list: data_dashboard[5].data_list,
            height_card:400,
            height_chart:350
          }"
        />
        <v-row class="mt-0">
        	<v-col cols=6>
        		 <selectGraph
              :selected_graph="data_dashboard[6].selected"
              :data_properties="{
                title:data_dashboard[6].variable,
                icon: 'mdi-desktop-classic',
                data_1: data_dashboard[6].data_list[1],
                data_2:data_dashboard[6].data_list[0],
              }"
            />
            <selectGraph
            	class="mt-3"
            	:selected_graph="data_dashboard[3].selected"
            	:data_properties="{
            		title:data_dashboard[3].variable,
            		icon: 'mdi-desktop-classic',
            		data_list: data_dashboard[3].data_list,
            		height_card:216,
            		height_chart:140
            	}"
            />
       	 	</v-col>
       	 	<v-col cols=6>
       	 		<selectGraph
              :selected_graph="data_dashboard[7].selected"
              :data_properties="{
                data_list: data_dashboard[7].data_list,
                title: data_dashboard[7].variable,
                icon: 'mdi-desktop-classic',
                width_chart: 300,
                height_chart: 300,
                height_card:390
              }"
            />
       	 	</v-col>
       	</v-row> 
      </div>
    </v-col>
  </v-row>
  <!-- // {{data_dashboard}} -->
	</div>
</template>

<script>
import selectGraph from '../components/dashboardComponents/selectGraph.vue';

import {formatCL} from '../functions/functions.js';

export default {

  name: 'totalViewVariables',
  components:{
  	selectGraph
  },
  props:[
  	'data_dashboard',
  	'cant_datos',
  	'cols'
  ],
  data () {
    return {
    	width_cols:{
      '1':4,
      '2':3,
      '3':5
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