<template>
	<div>
	  <apexchart
		type="bar"
		width="250"
		:height="height_chart"
		:options="chartOptions"
		:series="series"
		class="chart-wrapper"
	  ></apexchart>
	</div>
  </template>
  
  <script>
  export default {
	name: 'stackColumnVertical',
	props: ['height_chart', 'data_chart'],
	data() {
	  return {
		series: [],
		chartOptions: {
		  chart: {
			type: 'bar',
			stacked: true,
			stackType: '100%',
			toolbar: { show: false },
		  },
		  plotOptions: {
			bar: {
			  horizontal: false,
			  barHeight: '100%',
			  distributed: false,
			  columnWidth: '55%',
			  dataLabels: {
				position: 'center',
			  },
			},
		  },
		  stroke: {
			width: 0,
			colors: ['#fff'],
		  },
		  colors: ['#103E8E', '#5390EA', '#79A6E8'],
		  xaxis: {
			categories: [''],
			labels: {
			  style: {
				fontSize: '9px',
				colors: ['#2F48A3'],
			  },
			},
			axisBorder: {
			  show: true,
			  color: '#000000',
			  height: 1,
			},
			axisTicks: {
			  show: true,
			  color: '#000000',
			  height: 6,
			},
		  },
		  yaxis: {
			min: 0,
			max: 100,
			tickAmount: 7,
			labels: {
			  formatter: (val) => {
				const ranges = [
				  '0% - 13%',
				  '14% - 28%',
				  '29% - 42%',
				  '43% - 57%',
				  '58% - 71%',
				  '72% - 85%',
				  '86% - 100%',
				];
				const index = Math.floor(val / 14.3);
				return ranges[index] || '';
			  },
			  style: {
				fontSize: '9px',
				fontWeight: 'bold',
				colors: ['#000000'],
			  },
			},
			axisBorder: {
			  show: true,
			  color: '#000000',
			  width: 1,
			},
			axisTicks: {
			  show: true,
			  color: '#000000',
			  width: 6,
			},
		  },
		  annotations: {
			yaxis: [
			  {
				y: 72,
				borderColor: '#FF0000',
				label: {
				  borderColor: '#FF0000',
				  style: {
					color: '#fff',
					background: '#FF0000',
				  },
				  text: 'Promedio',
				},
			  },
			],
		  },
		  tooltip: {
			enabled: true,
			y: {
			  formatter: (val) => `${val}%`,
			},
		  },
		  fill: {
			opacity: 1,
		  },
		  dataLabels: {
			enabled: true,
			formatter: function (val, opts) {
			  return opts.w.globals.seriesNames[opts.seriesIndex];
			},
			offsetY: 0,
			style: {
			  colors: ['#ffffff'],
			  fontSize: '18px',
			  fontWeight: 'normal',
			},
		  },
		  grid: {
			show: false,
			borderColor: '#E0E0E0',
			padding: { top: 0, right: 0, bottom: 0, left: 0 },
		  },
		  legend: {
			show: false,
		  },
		},
	  };
	},
	mounted() {
	  this.updateChart();
	},
	watch: {
	  data_chart: {
		handler() {
		  this.updateChart();
		},
		immediate: true,
		deep: true,
	  },
	},
	methods: {
	  updateChart() {
		// Actualiza los datos de la serie y las categorías
		this.series = this.data_chart.series;
		this.chartOptions.xaxis.categories = this.data_chart.categorias;
	  },
	},
  };
  </script>
  
  <style scoped>
  </style>
  