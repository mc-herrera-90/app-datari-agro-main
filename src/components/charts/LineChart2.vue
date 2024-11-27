<template>
	<div id="LineChart">
		<apexchart type="line" ref="chart" :height="height" :options="chartOptions" :series="series" class="chart-wrapper"></apexchart>
	</div>
</template>

<script>
export default {

  name: 'LineChart2',
  props: ['data_chart','height'],
  data () {
    return {
      series: [
        {
          name: "default1",
          data: []
        },
        {
          name: "default2",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 19,
            left: 7,
            blur: 8,
            opacity: 0.1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: 0,
          offsetX: -5
        }
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
      return this.data_chart
    }
  },
  watch:{
    updateData(){
      this.updateChart();
    }
  },
  methods:{

    updateChart(){
      this.$refs.chart.updateOptions({
        series: [
          {
            data: this.data_chart.serie1,
            name: this.data_chart.name1
          },
          {
            data: this.data_chart.serie2,
            name: this.data_chart.name2
          }
        ],
        xaxis: {
          categories: this.data_chart.categories
        },
        colors: this.data_chart.colors,
        title: {
          text: '',
          align: 'left',
          style: {
            fontSize:  '18px',
            fontWeight:  'medium',
            fontFamily:  undefined,
            color:  '#263238'
          },
          margin:10,
          offsetY:0
        },
        tooltip:{
          theme:'dark'
        },
        yaxis:{
          labels:{
            show:false
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