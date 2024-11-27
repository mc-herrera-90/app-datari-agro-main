<template>
	<apexchart type="bar"  :height="'60%'" ref="chart" :options="chartOptions" :series="series" class="chart-wrapper"></apexchart>
  </template>
  
  <script>
  export default {
	name: 'stackColumn',
	props: [
	  'height_chart',
	  'data_chart'
	],
	data() {
	  return {
		series: [{
		  name: 'Propietario',
		  data: [3]
		}, {
		  name: 'Arrendatario',
		  data: [3]
		}, {
		  name: 'Comodato',
		  data: [1]
		}],
		chartOptions: {
		  chart: {
			type: 'bar',
			stacked: true,
			stackType: '100%',
			toolbar: {
			  show: false
			}
		  },
		  plotOptions: { // Barra horizontal
			bar: {
			  horizontal: true,
			  barHeight: '90%',
			  distributed: false,
			},
		  },
		  stroke: {
			width: 0,
			colors: ['#fff']
		  },
		  colors: [
			'#103E8E', // Color para "Propietario"
			'#5390EA', // Color para "Arrendatario"
			'#79A6E8'  // Color para "Comodato"
		  ],
		  xaxis: {
			categories: ['Propiedad'],
			offsetX:15,
			labels: {
			  formatter: (val) => `${val}`,
			  style: {
				fontSize: '.6vw',
				colors: ['#2F48A3']
			  }
			},
			min: 0,
			max: 100,
			tickAmount: 5,
			axisBorder: {
			  show: true,
			  color: '#E0E0E0'
			},
			axisTicks: {
			  show: true,
			  color: '#E0E0E0'
			},
		  },
		  yaxis: {
			show: false
		  },
		  tooltip: {
			enabled: true,
			y: {
			  formatter: function (val) {
				return `${val}`;
			  }
			}
		  },
		  fill: {
			opacity: 1
		  },
		  dataLabels: {
			enabled: true,
			formatter: (val) => `${val.toFixed(2).replace(".",",")}%`,
			offsetY:0,
			style: {
			  colors: ['#ffffff'],
			  fontSize: '.6vw',
			  fontWeight: 'bold'
			},
		  },
		  grid: {
			show: true,
			borderColor: '#E0E0E0',
			padding: {
			  top: 0,
			  right: 0,
			  bottom: 0,
			  left: 0
			}
		  },
		  legend: {
			position: 'bottom',
			horizontalAlign: 'center',
			fontSize: '8vw',
			fontFamily: 'Helvetica, Arial',
			fontWeight: 200,
			offsetX:0,
			itemMargin: {
			horizontal: 0,
			vertical:0
			},
		  }
		},
	  }
	},
	mounted() {
	  this.updateChart();
	},
	computed: {
	  updateData() {
		return this.data_chart;
	  }
	},
	watch: {
	  updateData() {
		this.updateChart();
	  }
	},
	methods: {
	  updateChart() {
		this.$refs.chart.updateOptions({
		  series: this.data_chart.series,
		  xaxis: {
			categories: this.data_chart.categorias
		  }
		});
	  }
	}
  }
  </script>
  
  <style scoped>
  .chart-wrapper {
		margin: 0;
		padding: 0;
		background-color: #fff;
		height: 90%;
  }
  </style>
  