<template>
	<div id="RankingChart">
			<apexchart type="bar" ref="chart" :height="height" :options="chartOptions" :series="series" class="chart-wrapper" width="95%"></apexchart>
	</div>
</template>

<script>
import {formatCL} from '../../functions/functions.js';

export default {

  name: 'RankingChart',
  props:['height','data_chart'],
  data () {
    return {
    	series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar:{
            show:false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels:{
            show:false
          },
          axisBorder: {
          show: true,
          color: '#78909C',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0
          },
          axisTicks: {
            show: false,
            
          },
        }
    	}
  	}
	},
	mounted(){
	
      this.updateChart();
    
	},
	computed:{
		updateData(){
			return this.data_chart;
		},
    updateData2(){
      return this.height;
    }
	},
	watch:{
		updateData(){
			this.updateChart()
		},
    updateData2(){
      this.updateChart();
    }
	},
	methods:{
		updateChart(){
  		this.$refs.chart.updateOptions({
  			series:[{
  				data: this.data_chart.serie,
  				name: this.data_chart.name
  			}],
  			xaxis: {
  				categories: this.data_chart.categories
  			},
  			title:{
  				text: this.data_chart.title,
  				align: 'center',
          offsetX: 0,
          offsetY: -5,
          margin:10,
          floating: true,
          style: {
            fontSize:  '15px',
            fontWeight:  'medium',
            fontFamily:  undefined,
            color:  '#263238'
          },
        },
        yaxis: {
          labels: {
            show: true,
            offsetX: 5,
          	offsetY: 0,
            align: 'left',
            formatter: function (val){
            	let len_string = val.length;
            	if (len_string > 25){
            		let temp_string = val.split(' ')
            		let string;
            		if (val.includes('Ethernet')){
            			string = 'Ethernet'
            		}
            		if (val.includes('No posee')){
            			string = 'No posee'
            		}
            		return string
            	}
            	// else if(len_string >){

            	// }
            	else{
            		return val
            	}
              
            },
            style :{
                fontSize: '15px',
            }

          },
        },
  			tooltip: {
  				theme:'dark',
          y: {
            formatter: function (val,options) {
            	// let data_type = options.w.config.data_type;
              return  formatCL(val) 
            }
          }
        }
  		});
  	}
	}
}
</script>

<style lang="css" scoped>
div.chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>