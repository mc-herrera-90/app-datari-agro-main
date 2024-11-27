<template>
	<div id="ColumnChartSimple">
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
                fontSize: '13px',
            },
            // formatter: function (val){
            //   let len_string = val.length;

            //   if(val.includes(' ')){
            //     let temp_string;
            //     temp_string = val.split(' ')
            //     if(val.includes('Ethernet')){
            //       temp_string = 'Ethernet'
            //     }
            //     else if(val.includes('No posee')){
            //       temp_string = 'No posee'
            //     }
            //     else if (val.includes('Internet Inalámbrico')){
            //       temp_string = 'Inalámbrico'
            //     }else if (val.includes('Fibra')){
            //       temp_string = 'Fibra'
            //     }
            //     else if(val.includes('Satelital')){
            //       temp_string = 'Satelital'
            //     }

            //     else if(val.includes('Cursos')){
            //       temp_string = 'Cursos'
            //     }                
            //     else if(val.includes('Reuniones')){
            //       temp_string = 'Reuniones'
            //     }
            //     return temp_string
            //   }
            //   // console.log(len_string)
            //   // if(len_string > 15){
            //   //   let temp_string;
            //   //   temp_string =  val.split(' ')

            //   //   if(val.includes('Ethernet')){
            //   //     temp_string = 'Ethernet'
            //   //   }
            //   //   if(val.includes('No posee')){
            //   //     temp_string = 'No posee'
            //   //   }
            //   //   if (val.includes('Internet Inalámbrico')){
            //   //     console.log(val)
            //   //     temp_string = 'WI-FI'
            //   //   }
            //   //   return temp_string
            //   // }
            //   else{
            //     console.log([val])
            //     return [val]
            //   }
              
            // }
          }
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