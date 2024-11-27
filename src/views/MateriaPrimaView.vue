<template>
    <div id="MateriaprimaView">
      <div id="header">
      <v-app-bar color="blue darken-2" class="rounded" flat dark>
        <div>
          <h2 class="font-weight-light mr-4 mb-0">ENCUESTA AGRO 2024</h2>
        </div>
        <div class="ml-6">
          <v-slide-group v-model="activeTab">
          <v-slide-item
            v-for="(item, index) in tabs"
            :key="index"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="index === activeTab ? 'blue lighten-5 black--text' : 'blue darken-1 white--text'"
              class="ma-2"
              height="40"
              width="200"
              dense
              solo-inverted
              @click="navigateTo(index)"
            >
              <v-row align="center" justify="center">
                <div class="mt-5">
                  <h4 class="font-weight-medium">{{ item.label }}</h4>
                </div>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        </div>
        <v-spacer/>
      </v-app-bar>
      </div>
      <div id="wrapper">
          <v-card id="left-wrapper">
                  <h2 class="gray-font-text"><b> 
                      Materias primas y
                      residuos orgánicos:</b>
                  </h2>
                    <h3 class="gray-font-text">Empresa: Akapacha</h3>
                    <DonutChart2
                    :data_chart="{ chartSeries: chartSeries, chartOptions: chartOptions, colors: ['#103E8E', '#5390EA'] }"
                    />
                    <p class="gray-font-text">
                      Gestión de residuos orgánicos:
                    </p>
                    <div class="d-flex justify-center my-3">
                    <v-btn
                      class="rounded-pill unactive"
                      color="grey lighten-2"
                      depressed
                    >
                      Siempre
                    </v-btn>
                    <v-btn
                      class="mx-2 rounded-pill active"
                      color="primary"
                      depressed
                    >
                      A veces
                    </v-btn>
                    <v-btn
                      class="rounded-pill unactive"
                      color="grey lighten-2"
                      depressed
                    >
                      Nunca
                    </v-btn>
                    </div>
                    <div>
                      <p class="gray-font-text">
                        Rango de residuos orgánicos reciclados o reutilizados:
                      </p>
                      <p class="mat_pri_number">51-75%</p>
                      <p class="gray-font-text">
                        Rango de residuos orgánicos para compostaje:
                      </p>
                      <p class="mat_pri_number">51-75%</p>

                      <p class="gray-font-text"><b>Nota:</b></p>

                      <p class="gray-font-text">
                        <small>
                          Los productos: dátil, limón, maíz y tomate aún no 
                          son materias primas  de uso anual en Akapacha, 
                          actualmente, están en proceso de exploración.
                        </small> 
                      </p>
                    </div>
              </v-card>
          <v-card id="right-wrapper">
              <SankeyChart 
              class=""/>
          </v-card>
      </div>
      </div>
</template>
  
  <script>
  import SankeyChart from '../components/charts/SankeyChart.vue';
  import DonutChart2 from '../components/charts/DonutChart2.vue';
    export default {
    name: 'MateriaPrimaView',
    data() {
      return {
        activeTab: 2,
        tabs: [
          { label: 'Caracterización', path: '/caracterizacion/' },
          { label: 'Rating', path: '/rating/' },
          { label: 'Materia prima', path: '/materiaprima/1' },
        ],
        chartSeries: [2247.9, 622.2], /////
        chartOptions: {
          chart: {
            type: 'donut'
          },
          labels: ['Materia Prima', 'Residuos Orgánicos' ],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'right'
              }
            }
          }]
        },
      }
    },
    components: {
      SankeyChart,
      DonutChart2
    },
      methods:{
        navigateTo(index) {
        this.activeTab = index;
        this.$router.push({ path: this.tabs[index].path });
      },
      },
      created(){
      }
    }
  </script>
  
  <style scoped>
#MateriaprimaView {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
#wrapper {
  display: flex;
  align-items: stretch;
  gap: 5px;
}
#left-wrapper,
#right-wrapper {
  height: 100%;
}
#left-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  gap: 5px;
  width: 30vw;
}

#right-wrapper {
  width: 100%;
  height: 100%;
}

.gray-font-text{
  color: #7F7F7F;
  font-weight: normal;
  padding: 0;
  margin: 0;
}
 h2.gray-font-text {
  font-size: 1.5vw;
 }

 h3.gray-font-text {
  font-size: 1.4vw;
 }

 p.gray-font-text {
  font-size: 1vw;
 }

 .v-btn {
  font-size: .8vw;
 }
.active {
  background-color: #103E8E !important;/* Texto gris para los botones inactivos */
  color: white !important; /* Texto blanco para el botón activo */
}
.unactive {
  color: #7F7F7F; 
  background-color: #103E8E !important;/* Texto gris para los botones inactivos */
}
.subtitle {
  color: #7F7F7F;  /* Color gris */
  font-weight: normal;
}

.mat_pri_number {
  color: #2F48A3;  /* Color azul */
  font-weight: bold;
  margin: 0; /* Espaciado entre los elementos */
  text-align: right;
  font-size: 1.6vw;
}
  </style>