<template>
	<div class="d-flex flex-column" style="align-items: center;">
        <apexchart type="donut" ref="chart"
          :width="'70%'"
          :options="chartOptions" 
          :series="series" 
          class="chart-wrapper" id="donut-participantes">
        </apexchart>
        <div class="legend-wrapper">
          <div class="legend-item" v-for="(label, index) in chartOptions.labels" :key="index">
            <span :style="{ backgroundColor: data_chart.colors[index] }" class="legend-color"></span>
            <span class="legend-label">{{ label }}</span>
            <span class="legend-value">{{ ((series[index] / totalSeries) * 100).toFixed(2).replace(".",",") }}%</span>
          </div>
        </div>
	</div>
</template>

<script>
export default {
  name: 'DonutChart',
  props: ['width', 'height_chart', 'height_card', 'data_chart'],
  data() {
    return {
      series: this.data_chart.serie,
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: this.data_chart.categories,
        colors: this.data_chart.colors,
        legend: {
          show: false, // Ocultamos la leyenda de ApexCharts y usamos nuestra propia leyenda personalizada
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
              labels: {
                show: false, // Oculta cualquier etiqueta dentro del gráfico de Donut
                name: {
                  show: false // Asegúrate de que las etiquetas de nombre no se muestren
                },
                value: {
                  show: false // Asegúrate de que el valor no se muestre
                },
                total: {
                  show: false // También desactiva el total en el centro
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false // Desactiva completamente los dataLabels
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            let total = series.reduce((a, b) => a + b, 0);
            let value = series[seriesIndex];
            let porcentaje = ((value / total) * 100).toFixed(2).replace(".",",");
            let label = w.globals.labels[seriesIndex];
            return `<div class="arrow_box" style="width:150px;height:75px;">
                      <div class="subtitle-1 ml-1 font-weight-medium">${label}</div>
                      <div class="body-1 ml-1" style="margin-top:-5px;">${porcentaje}%</div>
                    </div>`;
          }
        }
      }
    };
  },
  computed: {
    totalSeries() {
      return this.series.reduce((a, b) => a + b, 0);
    },
  }
};
</script>

<style lang="css" scoped>


.legend-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend-wrapper {
  display: flex;
}
.legend-wrapper span {
  font-size: .7vw;
}

.legend-color {
  width: 1vw;
  height: 1vw;
  display: inline-block;
}

.legend-label {
  margin: .2vw;
  color: #7F7F7F;
}

.legend-value {
  font-size: 16px;
  font-weight: bold;
  color: #103E8E;
}


</style>
