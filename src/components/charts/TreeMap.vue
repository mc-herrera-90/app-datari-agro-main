<template>
	<div id="chart">
    <apexchart
      type="treemap"
      :height="height"
      ref="chart"
      :options="chartOptions"
      :series="series"
      class="chart-wrapper"
    >
    </apexchart>
  </div>
</template>

<script>
export default {
  name: 'TreeMap',
  props: {
    data: {
      type: Object,
      default: () => ({
        serie: [],
        colors: []
      })
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: [String, Number],
    }
  },

  data() {
    return {
      series: [
        {
          data: this.data.serie || []
        }
      ],
      chartOptions: {
        legend: { show: false },
        chart: {
          type: 'treemap',
          toolbar: { show: false }
        },
        colors: this.data.colors || [],
        plotOptions: {
          treemap: { distributed: true, enableShades: false }
        },
        dataLabels: {
          enabled: true,
          style: { fontSize: '25px', fontWeight: 'medium' },
          formatter: function(text, op) {
            if (text.length < 35) return text;
            else if (op.value > 0 && op.value <= 12 && text.length < 35) return text;
          }
        },
        tooltip: {
          theme: 'dark',
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            let data = w.config.series[seriesIndex].data[dataPointIndex];
            let width_card = data.producto && data.producto.length > 20 ? '350px' : '300px';

            let total = series[0].reduce((a, b) => a + b, 0);
            let value = series[seriesIndex][dataPointIndex];
            let porcentaje = ((value / total) * 100).toFixed(2).replace('.', ',');
            let text = value + '/' + total;

            return (
              '<div class="arrow_box" style="width:' +
              width_card +
              ';height:auto; padding:10px;">' +
              '<div class="subtitle-1 font-weight-light">Producto: ' + data.producto + '</div>' +
              '<div class="subtitle-1 font-weight-light">Pertinencia: ' + data.pertinencia + '</div>' +
              '<div class="subtitle-1 font-weight-light">Práctica: ' + data.practica + '</div>' +
              '<div class="subtitle-1 font-weight-light">Sellos: ' + data.sellos + '</div>' +
              '<div class="subtitle-1 font-weight-light">Producción anual: ' + data.produccion + '</div>' +
              '<div class="subtitle-1 font-weight-light ml-1" style="margin-top:8px;">' +
              '</div>'
            );
          }
        }
      }
    };
  },

  mounted() {
    if (this.data && this.data.serie && this.data.colors) {
      this.updateChart();
    }
  },

  watch: {
    data: {
      handler(newData) {
        this.updateChart(); // Llama al método para actualizar el gráfico
      },
      deep: true // Permite detectar cambios profundos en el objeto `data`
    }
  },

  methods: {
    updateChart() {
      if (this.data && this.data.serie && this.data.colors) {
        this.series = [{ data: this.data.serie }];
        this.chartOptions.colors = this.data.colors;

        // Actualiza las opciones del gráfico
        this.$refs.chart.updateOptions({
          series: this.series,
          colors: this.data.colors
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
div.chart-wrapper {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
