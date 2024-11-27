<template>
	<div>
		<v-card flat :height="height_card">
			<v-card-title class="justify-center">
				<v-icon
        medium
        left
        >
	       {{icon}}
	      </v-icon>
				<h4 class="font-weight-medium">
					{{title}}
				</h4>
			</v-card-title>
			<v-card-text style="margin-top:-10px;">
				<ColumnChart 
          :data_chart="data_chart"
          :height="height_chart"
        />
			</v-card-text>
		</v-card>
	</div>
</template>

<script>

import ColumnChart from '../charts/ColumnChart.vue';

export default {

  name: 'infoCardColumnChart',
  props:[
  	'title','icon','data_chart','height_card',
  	'height_chart'
  ],
  components:{
  	ColumnChart
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>