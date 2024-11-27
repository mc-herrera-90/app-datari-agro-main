<template>
	<v-card flat :height="height_card">
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
			<h3 class="font-weight-medium">{{title}}</h3>
		</v-card-title>
		<v-card-text class="text-center" style="margin-top:-5px">
			<h4 class="font-weight-medium mb-4">{{subtitle}}</h4>
			<FillColumnChart 
				:height="height_chart"
				:data_chart="data_chart" 
			/>

		</v-card-text>
	</v-card>
</template>

<script>
import FillColumnChart from '../charts/FillColumnChart.vue';

export default {

  name: 'infoCardFillChart',
  props:[
  	'title','icon','data',
  	'subtitle','height_card','height_chart'
  ],
  components:{
  	FillColumnChart
  },
  data () {
    return {
      data_chart:null
    }
  },
  created(){
    this.data_chart = this.get_data_chart(this.data);
  },
  methods:{
  	get_data_chart(data){
  		let element;
  		let serie1=[];
  		let serie2=[];
  		let categories=[];
  		let name=''

  		for (element of data){
  			let value = element.porcentaje;
  			let option = element.option;

  			serie1.push(value)
  			serie2.push(100-value)
  			categories.push(option)
  		}

  		return {
  			serie1:serie1,
  			serie2:serie2,
  			categories:categories,
  			name1:'Porcentaje',
  			name2:'%',
  		}
  	}
  }
}
</script>

<style lang="css" scoped>
</style>