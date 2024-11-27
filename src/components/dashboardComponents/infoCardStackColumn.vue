<template>
		<v-card>
			<v-card-title >
				<v-icon center >
			    	{{icon}}	
	    		</v-icon>
				<h5 class="font-weight-bold">
					{{title}}
				</h5>
			</v-card-title>
			<stackColumn
				:height_chart="height_chart"
				:data_chart="data_chart"
			/>
		</v-card>
</template>

<script>
import stackColumn from '../charts/stackColumn.vue';
export default {

  name: 'infoCardStackColumn',
  props:[
  	'title',
  	'icon',
  	'data_list',
  	'height_chart',
  	'height_card'
  ],
  components:{
  	stackColumn
  },
  data () {
    return {
    	data_chart: null
    }
  },
  created(){
  	this.data_chart = this.get_data_chart(this.data_list);
  },
  computed:{
  	updateDataChart(){
  		return this.data_list
  	}
  },
  watch:{
  	updateDataChart(){
  		this.data_chart = this.get_data_chart(this.data_list);
  	}
  },
  methods:{
  	get_data_chart(data)
  	{
  		let element;
  		let serie = [];
  		let categories = ['Resultados'];

  		for( element of data ){
  			let data_temp;	

  			let name = element.option;
  			let value = [element.cant];

  			console.log(name)
  			if( name == 'En proceso de adquisición' )
  				name = 'En proceso';

  			data_temp = {
  				name: name,
  				data: value
  			}
  			serie.push(data_temp);
  		}

  		let data_final = {
  			series: serie,
  			categorias: categories
  		}

  		return data_final;
  	}
  }
}
</script>

<style lang="css" scoped>
</style>