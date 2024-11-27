<template>
	<v-card  height="388">
		<v-card-title>
      <v-icon
        left
        small
      >
        mdi-account-group-outline
      </v-icon>
			<h4 class="font-weight-medium">Pobreza</h4>
		</v-card-title>
    <v-card-subtitle>
       <h3 class="font-weight-light">Multidimensional</h3>
      </v-card-subtitle>
		<v-card-text>
			<div class="centrar" >
    	<v-slide-group
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
        class="ma-2"
        @click="onCardClick(item,i)"
        small
        width="100"
      >
      {{item.text}}
      </v-btn>
        <!-- <v-card
          :color="active ? 'primary white--text' : 'grey lighten-1'"
          class="ma-2"
          height="40"
          width="110"
          @click="onCardClick(item,i)"
        >
          <v-row
            align="center"
            justify="center"
          >
            <div class="mt-5 ">
            	<h4 class="font-weight-medium">{{item.text}}</h4>
            </div>
          </v-row>
        </v-card> -->
      </v-slide-item>
   	 </v-slide-group>
		</div>
  		<div v-if="selected_option === 1" >
  			<ColumnChart :height=250 :data_chart="data_chart_cantidad" />	
  		</div>
  		<div v-else style="margin-top:50px;">
  			<FillColumnChart :height=250 :data_chart="data_chart_porcentaje" />
  		</div>
		</v-card-text>
	</v-card>
</template>

<script>
import ColumnChart from '../charts/ColumnChartSimple.vue';
import FillColumnChart from '../charts/FillColumnChart.vue';
import {get_data_columnchart,get_data_fillcolumnchart} from '../../functions/chartFunctions.js';

export default {

  name: 'chartPobreza',
  props: ['data'],
  components: {
  	ColumnChart,
  	FillColumnChart
  },
  data () {
    return {
    	data_chart_cantidad: {},
    	data_chart_porcentaje:{},
    	selected_option:0,
    	select_options:[
    		{
    			'text': 'Índice',
    			'value': 'porcentaje'
	    	},
	    	{
	    		'text': 'Cantidad',
	    		'value': 'cantidad'
	    	}
    	]
    }
  },
  mounted(){
  	
		this.data_chart_cantidad = this.get_chart_cantidad(this.data);
		this.data_chart_porcentaje = this.get_chart_porcentaje(this.data);
  
  	
  },
  methods:{
  	get_chart_cantidad(data){
  		return get_data_columnchart(this.data);
  	},
  	get_chart_porcentaje(data){
  		return get_data_fillcolumnchart(this.data)
  	},

  	onCardClick(item,n){
      let selected = item.value;
      this.selected_option = n ;
    },
  },
  computed: {
  	updateData(){
  		return this.data;
  	}
  },
  watch:{
  	updateData(){
  		this.data_chart_porcentaje = this.get_chart_porcentaje(this.data);
  		this.data_chart_cantidad = this.get_chart_cantidad(this.data);
  	}
  }
}
</script>

<style lang="css" scoped>
.centrar{
	  display: flex;
    align-items: center;
    justify-content: center;
    margin-top:-10px;
}
</style>