<template>
	<div id="ColumnChart">
		<apexchart type="bar" ref="chart" :height="height" :options="chartOptions" :series="series" class="chart-wrapper"></apexchart>
	</div>
</template>

<script>
import {formatCL} from '../../functions/functions.js';


export default {

  name: 'ColumnChart',
  props:['height','data_chart'],
  data () {
    return {
    	series: [{
        name: '',
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          toolbar:{
          	show:false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: [],
           axisBorder: {
          show: true,
          color: '#78909C',
          height: 0.8,
          width: '100%',
          offsetX: 0,
          offsetY: 0,
          },
          axisTicks: {
            show: false,
            
          },
        },
        yaxis: {
        	show:false,
        },
        fill: {
          opacity: 1
        },
        data_type:''
      },
    }
  },
  mounted(){
  	if(this.data_chart !== {}){
      this.updateChart();
    }
  },
  computed:{
  	updateData(){
  		return this.data_chart;
  	}
  },
  watch:{
  	updateData(){
      if(this.data_chart !== {}){
        this.updateChart();
      }  		
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
  				categories: this.data_chart.categories,
          labels:{
            show:true,
            style :{
                fontSize: '12px',
            },
            formatter: function(value, timestamp, opts) {
              let string_length = value.length;
              if ( string_length >= 15 ){
                let temp = value.split(' ');
                return temp;
              }
              else{
                return value
              }
            }
            // 
          },
  			},
  			title:{
  				text: this.data_chart.title,
  				align: 'center',
          offsetX: 0,
          offsetY: 0,
          margin:-5,
          floating: true,
          style: {
            fontSize:  '15px',
            fontWeight:  'medium',
            fontFamily:  undefined,
            color:  '#263238'
          },
        },
  			data_type: this.data_chart.data_type,
  			tooltip: {
  				theme:'dark',
          y: {
            formatter: function (val,options) {
            	let data_type = options.w.config.data_type;
              return  formatCL(val) + ' ' + data_type
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