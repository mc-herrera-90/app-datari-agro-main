<template>
	<div>
		<v-card flat :height="height_card">
			<v-card-title class="justify-left">
				<v-icon
	        medium
	        left
	        >
	       {{icon}}
	      </v-icon>
	      <h4 class="font-weight-medium">{{title}}</h4>
			</v-card-title>
			<v-card-text>
				<div class="centrar_izq" id="options" >
			    <v-slide-group
			      v-model="selected_option_capacitacion"
			      dense
			      center-active
			      mandatory
			    >
			      <v-slide-item
			        v-for="(item,i) in select_options_capacitacion"
			        :key="i"
			        v-slot:default="{ active, toggle }"
			      >
			        <v-btn
			          :color="active ? 'primary white--text' : 'grey lighten-1'"
			          height="33"
			          small
			          class="mt-3 ma-1"
			          @click="onCardClick(item,i)"
			        >
		          	<h4 class="font-weight-medium">{{item}}</h4>
		        	</v-btn>
		      	</v-slide-item>
		     	</v-slide-group>
		    </div>
		    <div id="data" >
		    	<div v-if="data_var_selected.selected == 'tree_map' && data_var_selected != null">
		    		<TreeMap
              style="margin-top:-10px;"
							:data="get_data_chart_treemap(data_var_selected.data_list)"
							:height="height_chart"
							:width="'100%'"

		    		/>
		    	</div>
		    	<div v-if="data_var_selected.selected == 'column' && data_var_selected != null" >
		    		<ColumnChart
		    			:height="height_chart"
		    			:data_chart="get_data_chart(data_var_selected.data_list,'Cantidad de selecciones','')"
		    		/>
		    	</div>
          <div v-if="data_var_selected.selected == 'donut' && data_var_selected != null" >
            <DonutChart
              class="mt-3"
              :height_chart="height_chart"
              :data_chart="get_data_chart(data_var_selected.data_list,data_var_selected.variable,'opciones')"
              :width="width_chart"

            />
            <!-- <ColumnChart
              :height="height_chart"
              :data_chart="get_data_chart(data_var_selected.data_list,'Cantidad de selecciones','')"
            /> -->
          </div>
		    	<!-- {{data_var_selected}} -->
		    </div>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import TreeMap from '../charts/TreeMap.vue';
import ColumnChart from '../charts/ColumnChart.vue';
import DonutChart from '../charts/Donut.vue';



export default {

  name: 'dobleChartSelect',
  props:[
  	'data_var_1','data_var_2',
  	'height_card','height_chart',
  	'icon','title',
    'width_chart'
  ],
  components:{
  	TreeMap,
  	ColumnChart,
    DonutChart
  },
  data () {
    return {
    	selected_option_capacitacion:0,
    	select_options_capacitacion:[],
    	data_var_selected:{}
    }
  },
  mounted(){
    this.get_options_select(this.data_var_1,this.data_var_2);

  },
  computed:{
    updateOptions()
    {
      return this.data_var_1;
    }
  },
  watch:{
    updateOptions()
    {
    	this.get_options_select(this.data_var_1,this.data_var_2);
    }
  },
  methods:{
    get_options_select(data_var_1,data_var_2){
      // let size_data = data.length;
      let select_options_capacitacion = [data_var_1.variable,data_var_2.variable];
      // let select_options_capacitacion = (size_data === 9) ? [data[8].variable] : (size_data === 10) ? [data[8].variable,data[9].variable] : [];

      this.select_options_capacitacion = select_options_capacitacion;
      this.data_var_selected = data_var_1;

    },

    onCardClick(item,n)
    {
      this.selected_option_capacitacion = n;
     	this.data_var_selected = (n == 0) ? this.data_var_1 : (n == 1) ? this.data_var_2 : null;  
    },

    get_data_chart_treemap(data)
    {
  		let colors = [
        '#0069c0',
        '#001970',
        '#00695c',
        '#d81b60',
        '#b91400',
        '#373737'
      ];
  		let element;
  		let serie = [];

  		for (element of data){
  			let value = element.cant;
  			let option = element.option;

  			let temp = {
  				x: option,
  				y: value
  			}

  			serie.push(temp)
  		}


  		serie.sort((a,b) => (a.y < b.y) ? 1: -1)
  		
  		return {
  			serie:serie,
  			colors:colors.slice(0,serie.length)
  		}
  	},

  	get_data_chart(data_list, variable,tipo_data)
  	{
      let serie = [];
      let categories = [];
      let title = variable
      let name = tipo_data;
      let colors = [
        '#0069c0',
        '#001970',
        '#00695c',
        '#d81b60',
        '#b91400',
        '#373737'
      ]

      let element;

      for (element of data_list){
        let cant = element.cant;
        let option = element.option;

        if(option === 'Reuniones por Zoom o Teams'){
          option='Reuniones en linea'
        }

        serie.push(cant)
        categories.push(option)
      }

      return {
        serie: serie,
        categories: categories,
        title: title,
        name:name,
        data_type:name,
        colors: colors.slice(0,serie.length)
      }
    },
  }
}
</script>

<style lang="css" scoped>
.centrar_izq{
    display: flex;
    align-items: left;
    justify-content: left;
    margin-top:-15px;
}
</style>