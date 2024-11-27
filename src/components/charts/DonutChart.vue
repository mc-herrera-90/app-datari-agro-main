<template>
	<div>
		<v-card flat>
        <apexchart type="donut" ref="chart"
          :width="width"
          :height="height_chart" 
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
      </v-card> 
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
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.legend-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #b0b0b0;
  border: 1px solid red;
  font-weight: 500;
}

.legend-wrapper span {
  font-size: .7vw;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.legend-color {
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-right: 5px;
}

.legend-label {
  margin-right: 5px;
  font-size: 16px;
  color: #7F7F7F;
}

.legend-value {
  font-size: 16px;
  font-weight: bold;
  color: #103E8E;
}

@media(min-width: 992px) {
  #donut-participantes {
    height: 100px !important;
    border: 1px solid red;
  }
}
</style>
