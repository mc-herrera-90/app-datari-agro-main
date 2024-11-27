<template>
  <v-card  height=300>
    <v-card-title>
      <v-icon
        left
      >
      mdi-clipboard-check-multiple-outline
      </v-icon>
      <h4 class="font-weight-medium">
        {{data_chart_two_series.title}}
      </h4>
    </v-card-title>
    <v-card-text style="margin-top:-20px;">
      <LineChart2 :data_chart="data_chart_two_series" :height=180 />
      <div class="centrar">
         <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              v-model="selected_option"
              :items="select_options"
              label="Opciones"
              dense
              outlined
              item-text="text"
              item-value="value"
              v-on:change="cambiarOpcion"
            ></v-select>
          </v-col>
      	<!-- <v-slide-group
      	v-model="selected_option"
      	dense
      	center-active
    	>
      <v-slide-item
        v-for="(item,i) in select_options"
        :key="i"
        v-slot:default="{ active, toggle }"
      >
        <v-btn
          :color="active ? 'primary white--text' : 'grey lighten-1'"
          class="ma-1"
          height="30"
          width="120"
          @click="onCardClick(item,i)"
        >
          {{item.text}}
        </v-btn>
      </v-slide-item>
   	 </v-slide-group> -->
  	</div>
    </v-card-text>
  </v-card>
</template>

<script>
import LineChart2 from '../charts/LineChart2.vue';

import {get_data_linechart2} from '../../functions/chartFunctions.js';
export default {

  name: 'chartPermisos',
  props:['data_permisos'],
  components: {
  	LineChart2
  },
  data () {
    return {
    	select_options: [
      	{
      		'text': 'Obra Nueva',
      		'value': 'obra_nueva'
      	},
      	{
      		'text': 'Ampliación',
      		'value': 'ampliacion'
      	},
      	{
      		'text': 'Total',
      		'value': 'total'
      	},
      		
      ],
    	selected_option:'obra_nueva',

      data_chart_two_series:[],
      
    }
  },
  mounted(){
  	let selected = this.selected_option;
  	this.get_data_permisos_comuna(this.data_permisos,selected)
  },
  computed:{
  	updateData(){
  		return this.data_permisos;
  	}
  },
  watch:{
  	updateData(){
  		let selected = this.selected_option;
  		this.get_data_permisos_comuna(this.data_permisos,selected)
  	}
  },
  methods:{
  	get_data_permisos_comuna(data,selected){
      let data_selected = data[selected];
      this.data_chart_two_series = get_data_linechart2(data_selected);

    },


    cambiarOpcion(opcion){
      this.selected_option = opcion;
      this.get_data_permisos_comuna(this.data_permisos,this.selected_option)
    },
    
    
  }
}
</script>

<style lang="css" scoped>
.centrar{
    margin-top:-10px;
	  display: flex;
    align-items: center;
    justify-content: center;
}
</style>