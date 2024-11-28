<template>
    <v-card flat> 
      <v-card-title >
        <v-icon
          medium
          left
          >
         {{icon}}
        </v-icon>
        <span class="gray-font">{{data_chart.title}}</span>
      </v-card-title>
      <v-card-text style="margin-top:-10px;">
       <apexchart type="pie" :height="'100%'" ref="chart" 
         :options="chartOptions" :series="series" class="chart-wrapper"></apexchart>
      </v-card-text>
    </v-card>
</template>

<script>
export default {

  name: 'PieChart',
  props: ['width','height_chart','height_card','data_chart','icon'],

  data () {
    return {
    	series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        
        legend:{
        	position: 'bottom',
        	horizontalAlign: 'center', 
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          offsetY: 300,
          style: {
              fontSize: '13px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: ['white']
          },
          formatter: function (val, opts) {
            if (val > 8){
              return val.toFixed(1)+'%'
            }
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
      },
    }
  },
  mounted(){
  	this.updateChart();
  },
  computed:{
  	updateData(){
  		this.data_chart;
  	}
  },
  watch:{
  	data_chart: {
      handler() {
        this.updateChart();
      },
      deep: true, // Permite detectar cambios profundos en el objeto data_chart
    },
  },
  methods:{
  	updateChart(){
      let position_legend;
      
      if( this.height_card <= 200){
        position_legend = 'bottom';
      }
      else{
        position_legend = 'right';
      }

  		this.$refs.chart.updateOptions({
  			series:this.data_chart.serie,
  			labels: this.data_chart.categories,
  			colors:this.data_chart.colors,
        legend:{
          position: position_legend
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