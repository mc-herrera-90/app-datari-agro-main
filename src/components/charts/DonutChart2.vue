<template>
    <apexchart type="donut" ref="chart"
      :width="'90%'"
      :options="chartOptions"
      class="chart"
      :series="series">
    </apexchart>
</template>

<script>
export default {
  name: 'DonutChart',
  props: ['width', 'height_chart', 'data_chart'],
  data() {
    return {
      series: this.data_chart.chartSeries,
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: this.data_chart.chartOptions.labels,
        colors: this.data_chart.colors,
        legend: {
          show: true,
          position: 'right'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  color: '#000066', // Color azul oscuro para el nombre
                },
                value: {
                  show: true,
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  color: '#000066', // Color azul oscuro para el valor del porcentaje
                  offsetY: 0,
                  formatter: function (val, w) {
                    let total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    let porcentaje = ((val / total) * 100).toFixed(1).replace(".", ",");
                    return porcentaje + '%';
                  },
                },
                total: {
                  show: false,
                  label: 'Total',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 450,
                  color: '#373d3f',
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(1).replace(".", ",")+' Kg';
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: 'Arial, sans-serif',
            fontWeight: 400,
            colors: ['#FFFFFF'] // Cambia el color a azul oscuro para los dataLabels de porcentaje fuera del centro
          },
          formatter: function (val) {
            return val.toFixed(1).replace(".", ",") + '%'; // Cambia el punto a coma y añade el símbolo de porcentaje
          }
        },
        tooltip: {
          enabled: true
        }
      }
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
      deep: true,
    },
  },
  methods: {
    updateChart() {
      this.$refs.chart.updateOptions({
        series: this.data_chart.chartSeries,
        labels: this.data_chart.chartOptions.labels,
        colors: this.data_chart.colors,
      });
    },
  },
};
</script>

<style scoped>
.chart {
}
</style>
