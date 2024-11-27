<template>
	<div id="chart">
		<apexchart type="donut"  ref="chart"
	    :width="width" 
	    :height="height_chart" 
	    :options="chartOptions" 
	    :series="series" 
	    class="chart-wrapper">
	  </apexchart>
	</div>
</template>

<style lang="css" scoped>
div.chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>


<script>
export default {

  name: 'Donut',
  props: ['width','height_chart','data_chart'],
  data () {
    return {
    	series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
           	donut:{
            	size: '65%',
            	labels: {
              	show:true,
              	name:{
                	fontSize: this.height_chart > 350 ? '145px' : '12.5px',
	                fontFamily: 'Helvetica, Arial, sans-serif',
	                fontWeight: 400,
	                color: undefined,
	                offsetY: 0,
	                formatter: function (val) {
	                  return val
	                }
	              },
	              value: {
	                show: true,
	                fontSize: this.height_chart > 350 ? '15px' : '12.5px',
	                fontFamily: 'Helvetica, Arial, sans-serif',
	                fontWeight: 400,
	                offsetY: 0,
	                formatter: function (val,w) {
	                	let series = w.globals.seriesTotals;
	                  let total = series.reduce((a, b) => {
                      return a + b
                    }, 0);

	                  let porcentaje = (val/total)*100;
	                  porcentaje = (porcentaje.toFixed(2)) + '%';
	                  
	                  let text = val+'/'+total;
	                  
	                  return text
	                }
	              },
	              total:{
	              	show: true,
				          label: 'Total',
				          fontSize: this.height_chart > 350 ? '15px' : '12.5px',
				          fontFamily: 'Helvetica, Arial, sans-serif',
				          fontWeight: 600,
				          color: '#373d3f',
				          formatter: function (w) {
				            return w.globals.seriesTotals.reduce((a, b) => {
				              return a + b
				            }, 0)
				          }
				        }
	            }
          	}
          }
        },
        dataLabels:{
          enabled:true,
          formatter: function (val, opts) {
            if (val > 5){
              return val.toFixed(1)+'%'
            }
          },
          style: {
          		//obtener según tamaño de el chart
              fontSize: this.height_chart > 350 ? '15px' : '13px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'medium',
              colors: ['white']
          },
        },
        tooltip: {
          custom: function({series, seriesIndex, dataPointIndex, w}) {

          	//Total segun valores de serie
            let total = series.reduce((a, b) => {
              return a + b
            }, 0);

            let value = series[seriesIndex];

            let porcentaje = ((value/total)*100).toFixed(2);
            
            let label = w.globals.labels[seriesIndex];

            let text = value+'/'+total;


            return '<div class="arrow_box" style="width:150px;height:75px;">' +
              '<div class="subtitle-1 ml-1  font-weight-medium">' + label + '</div>' +
              '<div class="body-1 ml-1" style="margin-top:-5px;">' +porcentaje+'%'+'</div>' +
              '<div class="subtitle-2 ml-1" style="margin-top:0px;">' +text  + '</div>' +
              
              '</div>'
          }
        },

        
      
      },
    }
  },
  mounted(){
  	this.updateChart(this.data_chart);
  },
  computed:{

  },
  watch:{

  },
  methods:{
  	updateChart(data_chart){
  		this.$refs.chart.updateOptions({
  			series: data_chart.serie,
  			labels: data_chart.categories,
  			colors: data_chart.colors
  		});
  	}
  }
}
</script>

<style lang="css" scoped>
</style>