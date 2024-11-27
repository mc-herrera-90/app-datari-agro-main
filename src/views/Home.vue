<template>
  <div id="home">
    <div id="head">
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
    <div id="body" class="mt-4">
      <v-row>
        <v-col cols="12">
          <v-card flat class="rounded" style="height: 80vh;">
            <v-row>
              <v-col>
                
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.common.js';


export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      activeTab: -1,
      producers:[{ id: 1, nombre: 'Prod 1' },
      { id: 2, nombre: 'Prod 2' },
      { id: 3, nombre: 'Prod 3' },
      { id: 4, nombre: 'Prod 4' },
      { id: 5, nombre: 'Prod 5' },
      { id: 6, nombre: 'Prod 6' },
      { id: 7, nombre: 'Prod 7' }
    ],
      user_id: localStorage.getItem('user_id'), // Recupera el user_id del localStorage
      user_role: localStorage.getItem('user_role'), // Recupera el user_id del localStorage
      tabs: [
        { label: 'Caracterización', path: '/caracterizacion/' },
        { label: 'Rating', path: '/rating/' },
        { label: 'Materia prima', path: '/materiaprima/' },
      ],
      loading: true, // Para indicar que los datos se están cargando
      myTitle: 'Prueba',
      mySubtitle: 'Prueba',
      myArray: [{ option: 'orange' }],
      
      chartSeries: [44, 55], // Datos de ejemplo para la gráfica de Donut
      chartOptions: {
        chart: {
          type: 'donut'
        },
        labels: ['Opción 1', 'Opción 2'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    
    };
  },
  computed:{
    ...mapState(['selectedProducer', 'generalData']),
  },
  methods: {
    navigateTo(index) {
      this.activeTab = index;
      this.$router.push({ path: this.tabs[index].path });
    },

  },
  mounted() {
    if (this.selectedProducer) {
      this.$store.dispatch('fetchGeneralData', this.selectedProducer);
    }
  }
}
</script>

<style scoped>
.v-btn.white--text {
  background-color: white;
  color: black !important;
}
.home{
  background-color: #D5D8DC;
}
</style>
