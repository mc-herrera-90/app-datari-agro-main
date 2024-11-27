<template>
    <div id="DetallesView">
        <div id="header">
            <v-app-bar color="blue darken-2" class="rounded" flat dark>
                <div>
                    <h2 class="font-weight-light mr-4 mb-0">
                        ENCUESTA AGRO 2024
                    </h2>
                </div>
                <div class="ml-6">
                    <v-slide-group v-model="activeTab">
                        <v-slide-item
                            v-for="(item, index) in tabs"
                            :key="index"
                            v-slot:default="{ active, toggle }"
                        >
                            <v-card
                                :color="
                                    index === activeTab
                                        ? 'blue lighten-5 black--text'
                                        : 'blue darken-1 white--text'
                                "
                                class="ma-2"
                                height="40"
                                width="200"
                                dense
                                solo-inverted
                                @click="navigateTo(index)"
                            >
                                <v-row align="center" justify="center">
                                    <div class="mt-5">
                                        <h4 class="font-weight-medium">
                                            {{ item.label }}
                                        </h4>
                                    </div>
                                </v-row>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </div>
                <v-spacer />
            </v-app-bar>
        </div>
        <div class="body-detalles-view mt-4">
            <v-row>
                <v-col cols="6" class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0 ">
                        <v-col cols="3" class="pa-1 ">
                            <v-card class="text-center" height="200">
                                    <p class="gray-font-title1">
                                        Ubicación
                                    </p>
                                    <p class="blue_number mt-10">
                                        {{ generalData.productor.ubicacion_predio }}
                                    </p>
                                </v-card>
                            </v-col>
                            <v-col cols="9" class="pa-1 ma-0">
                                <v-card height="200" class="ma-0 pa-0">
                                <span class="ml-4 gray-font-title1">
                                    Productos
                                </span>
                                <TreeMap
                                style="margin-top: -32px; margin-left: 4px; margin-right: 4px;"
                                :data="maptreeData"
                                />
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- Hasta acá la primera fila -->
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" class="pa-1">
                            <v-card height="192">
                                <v-row class="ma-0 pa-0">
                                    <!-- Sección de Total Trabajadores -->
                                    <v-col cols="4" class=" text-center ">
                                        <p class="gray-font-title1 ma-0">Capital Humano</p>
                                        <p class="gray-font-subtitle">Total Trabajadores</p>
                                        <span class="gray-font-text">(cantidad)</span>
                                        <p class="blue_number">{{generalData.trabajadores.total  }}</p>
                                    </v-col>
                                    <!-- Sección de Formación -->
                                    <v-col cols="4" class="text-center ma-0 pa-0">
                                        <p class="gray-font-subtitle text-center ma-0 pa-0">Formación</p>

                                        <div class="chips-container">
                                            <div class="chips-container-inner">
                                            <span
                                                :class="generalData.trabajadores.postgrado > 0 ? 'blue-chip' : 'gray-chip'"
                                                label
                                            >Postgrado</span>
                                            <span
                                                :class="generalData.trabajadores.postgrado > 0 ? 'blue-font-text' : 'gray-font-text'"
                                                class="ml-2 pa-0"
                                            >{{ generalData.trabajadores.postgrado }}</span>
                                            </div>

                                            <div class="chips-container-inner">
                                            <span
                                                :class="generalData.trabajadores.pregrado > 0 ? 'blue-chip' : 'gray-chip'"
                                                label
                                            >Pregrado</span>
                                            <span
                                                :class="generalData.trabajadores.pregrado > 0 ? 'blue-font-text' : 'gray-font-text'"
                                                class="ml-2 pa-0"
                                            >{{ generalData.trabajadores.pregrado }}</span>
                                            </div>

                                            <div class="chips-container-inner">
                                            <span
                                                :class="generalData.trabajadores.media > 0 ? 'blue-chip' : 'gray-chip'"
                                                label
                                            >E. Media</span>
                                            <span
                                                :class="generalData.trabajadores.media > 0 ? 'blue-font-text' : 'gray-font-text'"
                                                class="ml-2 pa-0"
                                            >{{ generalData.trabajadores.media }}</span>
                                            </div>

                                            <div class="chips-container-inner">
                                            <span
                                                :class="generalData.trabajadores.basica > 0 ? 'blue-chip' : 'gray-chip'"
                                                label
                                            >E. Básica</span>
                                            <span
                                                :class="generalData.trabajadores.basica > 0 ? 'blue-font-text' : 'gray-font-text'"
                                                class="ml-2 pa-0"
                                            >{{ generalData.trabajadores.basica }}</span>
                                            </div>
                                        </div>
                                        </v-col>

                                    <!-- Sección de Capacitación -->
                                    <v-col cols="4" class="ma-0 pa-0 text-center">
                                <span class="gray-font-subtitle">Capacitación</span>
                                <div class="chips-container">
                                    <span class="gray-font-text">(Frecuencia cap. BPA)</span>
                                    <span
                                    :class="generalData.trabajadores.frecuencia_capacitacion[0].frecuencia_capacitacion_bpa ? 'blue-chip' : 'gray-chip'"
                                    label
                                    >
                                    {{ generalData.trabajadores.frecuencia_capacitacion[0].frecuencia_capacitacion_bpa || 'N/A' }}
                                    </span>
                                    
                                    <span class="gray-font-text">(Frecuencia cap. Seguridad)</span>
                                    <span
                                    :class="generalData.trabajadores.frecuencia_capacitacion_seguridad[0].frecuencia_capacitacion_seguridad ? 'blue-chip' : 'gray-chip'"
                                    label
                                    >
                                    {{ generalData.trabajadores.frecuencia_capacitacion_seguridad[0].frecuencia_capacitacion_seguridad || 'N/A' }}
                                    </span>
                                </div>
                                </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- Hasta acá la segunda fila -->
                    <v-row class="ma-0 pa-0">
                        <v-col cols=8 class="pa-1">
                            <v-card height="338">
                                <p class="gray-font-title1 ml-6">Comercialización</p>
                                <PieChart
                                :data_chart="PieChartData"  
                                :height="200"
                                :height_chart="200"
                                :key="selectedProducer"
                                />
                            </v-card>
                        </v-col>
                        <v-col cols=4 class="pa-0">
                            <v-row class="ma-0 pa-0">
                                <v-col class="pa-1">
                                    <v-card class="pa-0 text-center" height="155">
                                        <p class="gray-font-subtitle ma-0 pa-0">Producción</p>
                                        <p class="gray-font-text-ligth ma-0 pa-0">(todos los productos)</p>
                                        <p class="gray-font-text ma-0 pa-0">Total anual (TON)</p>
                                        <p class="blue_number mb-0">{{ generalData.cultivos.total_produccion_anual.replace(".",",") }}</p>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <!--  -->
                            <v-row class="ma-0 pa-0">
                                
                                <v-col class="pa-1 text-center">
                                    <v-card class="pa-0" height="175">
                                    <p class="gray-font-subtitle text-center ma-0 pa-0">Evolución producción</p>
                                    <p class="gray-font-text-ligth text-center ma-0 pa-0">(Últimos 5 años)</p>
                                    <div class="chips-container">
                                        <span :class="generalData.cultivos.evolucion_produccion === 3 ? 'blue-chip' : 'gray-chip'" label>Aumento</span>
                                        <span :class="generalData.cultivos.evolucion_produccion === 2 ? 'blue-chip' : 'gray-chip'" label>Igual</span>
                                        <span :class="generalData.cultivos.evolucion_produccion === 1 ? 'blue-chip' : 'gray-chip'" label>Disminución</span>
                                    </div>
                                </v-card>
                                </v-col>
                                
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <!-- <Hasta acá la columna de la izquierda -->
                <v-col cols="6">
                    <v-row>
                        <v-col cols="8" class="pa-1 ma-0">
                            <v-card height="400">
                            <v-card-text>
                                <p class="gray-font-title1 ma-0">Rating</p>
                                <p class="gray-font-subtitle ma-0 mt-1">Productores</p>
                                <p class="gray-font-text ma-0 mt-1">Buenas Prácticas Sostenibilidad Agrícola (BPSA)</p>
                                <div style="width: 100%; height: 100%; overflow: hidden;">
                                    <v-img
                                    :src="generalData.productor && generalData.productor.ranking_bpsa
                                        ? require(`../media/rating_${generalData.productor.ranking_bpsa}.svg`)
                                        : require('../media/rating_F.svg')"
                                    alt="Ranking BPSA"
                                    max-width="500"
                                    max-height="300"
                                    style="transform: scale(2.1);"
                                    contain
                                    ></v-img>

                                </div>
                            </v-card-text>
                        </v-card>

                        </v-col>
                        <v-col cols="4" class="pa-1">
                            <v-card height="400" class="text-center d-flex flex-column align-start">
                                <p class="gray-font-title1 ml-4 mt-1">Percepción</p>
                                <p class="gray-font-subtitle ml-4 ma-0  ">Prácticas Agrícolas</p>
                                <StackColumnVertical
                                :height_chart="290"
                                :data_chart="chartSeries"
                                />
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- Hasta acá la segunda fila de la derecha -->
                    <v-row>
                        <v-col cols="8" class="pa-1 ma-0">
                            <v-card height="165">
                                <p class="gray-font-title1 ma-0 ml-3">Gestión de Residuos</p>
                                <v-row>
                                    <!-- Gestión de Residuos Orgánicos -->
                                    <v-col cols="3" class="ma-0">
                                    <p class="gray-font-text ml-4">
                                        Realiza Gestión Residuos Orgánicos
                                    </p>
                                    </v-col>
                                    <v-col cols="3" class="text-center">
                                    <div class="chips-container">
                                        <span
                                        :class="generalData.residuos.gestion_organicos === 3 ? 'green-chip-r' : 'gray-chip-r'"
                                        >
                                        Siempre
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_organicos === 2 ? 'green-chip-r' : 'gray-chip-r'"
                                        >
                                        A veces
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_organicos === 1 ? 'green-chip-r' : 'gray-chip-r'"
                                        >
                                        Nunca
                                        </span>
                                    </div>
                                    </v-col>

                                    <!-- Gestión de Residuos No Orgánicos -->
                                    <v-col cols="3">
                                    <p class="gray-font-text ml-3">
                                        Realiza Gestión Residuos No Orgánicos
                                    </p>
                                    </v-col>
                                    <v-col cols="3" class="text-center">
                                    <div class="chips-container">
                                        <span
                                        :class="generalData.residuos.gestion_no_organicos === 3 ? 'green-chip-r' : 'gray-chip-r'"
                                        >
                                        Siempre
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_no_organicos === 2 ? 'green-chip-r' : 'gray-chip-r'"
                                        >
                                        A veces
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_no_organicos === 1 ? 'green-chip-r' : 'gray-chip-r'"
                                        >
                                        Nunca
                                        </span>
                                    </div>
                                    </v-col>
                                </v-row>
                                </v-card>

                        </v-col>
                        <v-col cols="4" class="pa-1">
                            <v-card height="165" class="text-center">
                                <p class="gray-font-subtitle ma-0">Consumo agua</p>
                                <p class="gray-font-text">Total anual(M3)</p>
                                <p class="blue_number">{{ generalData.cultivos.consumo_anual_agua.replace(".",",") }}</p>
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- Hasta aca la tercera fila de la derecha -->
                    <v-row>
                        <v-col cols="8" class="pa-0 ma-0">
                            <v-row class="ma-0 pa-0">
                                <v-col cols=4 class="pa-1">
                                    <v-card height="165" class="text-center">
                                    <p class="gray-font-subtitle">Certificaciones</p>
                                    <div class="square-container">
                                        <!-- Botón para "Sí" -->
                                        <span
                                            class="square-gray "
                                            :class="{ 'square-green': generalData.certificaciones[0] !== 'No tiene' }"
                                        >
                                            Sí
                                        </span>
                                        <!-- Botón para "No" -->
                                        <span
                                            class="square-gray"
                                            :class="{ 'square-green': generalData.certificaciones[0] === 'No tiene' }"
                                        >
                                            No
                                        </span>
                                    </div>
                                </v-card>


                                </v-col>
                                <v-col cols=4 class="pa-1">
                                    <v-card height="165" class="text-center">
                                    <p class="gray-font-subtitle">
                                        Trazabilidad
                                    </p>
                                    <div class="square-container">
                                        <span
                                            class="square-gray"
                                            :class="{ 'square-green': generalData.trazabilidad.realiza_trazabilidad === 'Si' }"
                                        >
                                            Sí
                                        </span>
                                        <span
                                            class="square-gray"
                                            :class="{ 'square-green': generalData.trazabilidad.realiza_trazabilidad === 'No' }"
                                        >
                                            No
                                        </span>
                                    </div>
                                </v-card>

                                </v-col>
                                <v-col cols=4 class="pa-1">
                                    <v-card height="165" class="text-center">
                                    <span class="gray-font-subtitle">Registro</span>
                                    <div class="chips-container">
                                        <span
                                        :class="generalData.trazabilidad.forma_registro === 3 ? 'big-green-chip-r' : 'big-gray-chip-r'"
                                        >
                                        Cuaderno C. Digital
                                        </span>
                                        <span
                                        :class="generalData.trazabilidad.forma_registro === 2 ? 'big-green-chip-r' : 'big-gray-chip-r'"
                                        >
                                        Cuaderno C. Impreso
                                        </span>
                                        <span
                                        :class="generalData.trazabilidad.forma_registro === 1 ? 'big-green-chip-r' : 'big-gray-chip-r'"
                                        >
                                        No realiza
                                        </span>
                                    </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                            
                        </v-col>
                        <v-col cols="4" class="pa-1">
                            <v-card height="165" class="text-center">
                            <p class="gray-font-subtitle mb-5">Frecuencia registro</p>
                            <div class="circle-container">
                                <span
                                :class="generalData.trazabilidad.frecuencia_registro === 1 ? 'rounded-green' : 'rounded-gray'"
                                >
                                1
                                </span>
                                <span
                                :class="generalData.trazabilidad.frecuencia_registro === 2 ? 'rounded-green' : 'rounded-gray'"
                                >
                                2
                                </span>
                                <span
                                :class="generalData.trazabilidad.frecuencia_registro === 3 ? 'rounded-green' : 'rounded-gray'"
                                >
                                3
                                </span>
                                <span
                                :class="generalData.trazabilidad.frecuencia_registro === 4 ? 'rounded-green' : 'rounded-gray'"
                                >
                                4
                                </span>
                                <span
                                :class="generalData.trazabilidad.frecuencia_registro === 5 ? 'rounded-green' : 'rounded-gray'"
                                >
                                5
                                </span>
                            </div>
                            <p class="gray-font-text mt-5">
                                {{
                                generalData.trazabilidad.frecuencia_registro === 1
                                    ? 'Nunca'
                                    : generalData.trazabilidad.frecuencia_registro === 2
                                    ? 'Rara vez'
                                    : generalData.trazabilidad.frecuencia_registro === 3
                                    ? 'No tengo registros'
                                    : generalData.trazabilidad.frecuencia_registro === 4
                                    ? 'A menudo'
                                    : 'Siempre'
                                }}
                            </p>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import StackColumnVertical from '../components/charts/stackColumnVertical.vue';
import PieChart from '../components/charts/PieChart.vue';
import TreeMap from '../components/charts/TreeMap.vue';
import { mapActions, mapState } from 'vuex';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
  name: 'DetallesView',
  components: {
    TreeMap,
    StackColumnVertical,
    PieChart,
  },
  data() {
    return {
      activeTab: -1,
      user_id: localStorage.getItem('user_id'),
      tabs: [
        { label: 'Caracterización', path: '/caracterizacion/' },
        { label: 'Rating', path: '/rating/' },
        { label: 'Materia Prima', path: '/materiaprima/' },
      ],
      producers: [
        { id: 1, nombre: 'Prod 1' },
        { id: 2, nombre: 'Prod 2' },
        { id: 3, nombre: 'Prod 3' },
        { id: 4, nombre: 'Prod 4' },
        { id: 5, nombre: 'Prod 5' },
        { id: 6, nombre: 'Prod 6' },
        { id: 7, nombre: 'Prod 7' },
      ],
      PieChartData: {
        title: '',
        serie: [],
        categories: ['Internacional', 'Regional', 'Nacional'],
        colors: ['#79A6E8', '#5390EA', '#103E8E'],
      },
      maptreeData: {},
      chartSeries: [],
    };
  },
  computed: {
    ...mapState(['generalData']),
    selectedProducer() {
      return this.$route.params.producerId;
    },
  },
  methods: {
    ...mapActions(['fetchGeneralData']),
    navigateTo(index) {
      this.activeTab = index;
      this.$router.push({ path: this.tabs[index].path });
    },
    assignColorsToCultivos(cultivos, colorMapping) {
      return cultivos.map(
        (cultivo) => colorMapping[cultivo.producto] || '#CCCCCC'
      );
    },
    updateMaptreeData() {
      if (this.generalData?.cultivos?.lista_cultivos) {
        const cultivos = this.generalData.cultivos.lista_cultivos;

        // Objeto de colores por producto
        const colorMapping = {
          Pimiento: '#62B238',
          Ají: '#F4731B',
          Dátil: '#C35B1B',
          Tomate: '#DC1933',
          Aceituna: '#488A29',
          'Tomate Cherry': '#F31C17',
          Maíz: '#FAD829',
          Albahaca: '#3ABB5C',
          Maracuyá: '#E1BF26',
          Guayaba: '#EB8180',
          Limón: '#E6ED6F',
          Ajo: '#E7A6E1',
          Berenjena: '#2A7629',
          Orégano: '#44B443',
          Pepino: '#9DE080',
        };

        // Asigna colores a cada cultivo
        const colors = this.assignColorsToCultivos(cultivos, colorMapping);

        // Transformar el array en un objeto adecuado para TreeMap
        this.maptreeData = {
          serie: cultivos.map((cultivo) => ({
            x: cultivo.producto || 'Sin Producto',
            y: parseFloat(cultivo.produccion_anual) || 0,
            producto: cultivo.producto || 'Sin Producto',
            pertinencia: cultivo.grado_pertinencia_cultivo || 'Sin Pertinencia',
            practica: cultivo.practica_agricola || 'Sin Práctica',
            sellos: cultivo.sello || 'No tiene',
            produccion: `${cultivo.produccion_anual || 0} Ton`,
          })),
          colors, // Paleta de colores
        };
      }
    },
    updatePieChartData() {
      if (this.generalData?.cultivos) {
        const cultivos = this.generalData.cultivos;
        this.PieChartData = {
          title: cultivos.producto_mayor_produccion || 'Sin Título',
          serie: [
            cultivos.porcentaje_internacional || 0,
            parseInt(cultivos.porcentaje_regional) || 0,
            parseInt(cultivos.porcentaje_nacional) || 0,
          ],
          categories: ['Internacional', 'Regional', 'Nacional'],
          colors: ['#79A6E8', '#5390EA', '#103E8E'],
        };
      }
    },
    updateStackColumnVerticalData() {
      if (this.generalData?.productor) {
        const valorPercepcion = this.generalData.productor.percepcion || 0;
        const diff = 100 - valorPercepcion;
        const productor = this.producers.find(
          (p) => p.id === this.generalData.productor.id
        );
        const nombreProductor = productor
          ? productor.nombre
          : `P${this.selectedProducer}`;

        this.chartSeries = {
          series: [
            { name: nombreProductor, data: [valorPercepcion] },
            { name: ' ', data: [diff] },
          ],
          categorias: ['Percepción'],
        };
      }
    },
  },
  watch: {
    selectedProducer: {
      handler(newProducerId) {
        if (newProducerId) {
          this.fetchGeneralData(newProducerId);
        }
      },
      immediate: true,
    },
    generalData: {
      handler() {
        this.updatePieChartData();
        this.updateMaptreeData();
        this.updateStackColumnVerticalData();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>


<style>
.body-detalles-view{
    padding: 0;
    margin: 0;
}

.gray-font-title1 {
    padding: 0;
    margin: 0;
    color: #7F7F7F;
    font-size: 30px;
    font-weight: Bold;
}
.gray-font-subtitle{
    padding: 0;
    margin: 0;
    color: #7F7F7F;
    font-size: 20px;
    font-weight: bold;
}
.gray-font-text {
    padding: 0;
    margin: 0;
    color: #7F7F7F;
    font-size: 18px;
    font-weight: normal;
}
.gray-font-text-ligth{
    font-size: 14px;
    color: #7F7F7F;
    font-weight: normal;
    margin-left:10px ;
}

.blue_number {
  font-size: 32px; /* Tamaño de fuente más grande */
  color: #2f48a3;  /* Color azul */
  font-weight: bold;
}

.gray-font-text-italic {
    padding: 0;
    margin: 0;
    color: #7F7F7F;
    font-size: 20px;
    font-style: italic;
    font-weight: normal;
}
.gray-chip{
    margin: 2px;
    height: 34px;
    width: 120px;
    background-color: #B6B7B7; /* Gris */
    color: #ffffff;
    font-weight: normal;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 14px;
}

.blue-chip {
    margin: 2px;
    height: 36px;
    width: 120px;
    background-color: #2f48a3; /* Azul */
    color: #ffffff;
    font-weight: normal;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 14px;
}
.gray-chip-r {
    height: 34px;
    width: 100px;
    background-color: #B6B7B7; /* Gris */
    color: #ffffff;
    font-weight: normal;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 14px;
    margin: 3px;
}

p {
    margin: 0;
    padding: 0;
}
.chips-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.chips-container-inner{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.green-chip-r {
    margin: 2px;
    height: 34px;
    width: 100px;
    background-color: #60B239; /* Azul */
    color: #ffffff;
    font-weight: normal;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 14px;
}
.blue-font-text {
    color: #2f48a3; /* Azul */
    font-weight: bold;
    padding: 2px;
    font-size: 20px;
}


/*  */
.circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Espacio entre los círculos */
}

.rounded-gray,
.rounded-green {
    width: 40px; /* Ancho del círculo */
    height: 40px; /* Alto del círculo */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: normal;
    border-radius: 50%; /* Hace que el elemento sea circular */
}

.rounded-gray {
    background-color: #B6B7B7;
    color: #ffffff;
}

.rounded-green {
    background-color: #60B239;
    color: #ffffff;
}
/*  */
.square-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Espacio entre los cuadrados */
}

.square-gray,
.square-green {
    width: 50px; /* Ancho del cuadrado */
    height: 50px; /* Alto del cuadrado */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: normal;
    border-radius: 0px; /* Borde ligeramente redondeado */
}

.square-gray {
    background-color: #B6B7B7;
    color: #ffffff;
}

.square-green {
    background-color: #60B239;
    color: #ffffff;
}
.big-gray-chip-r,
.big-green-chip-r {
    width: 150px; /* Ancho más grande */
    padding: 5px 0; /* Ajusta el padding vertical para mayor altura */
    display: flex;
    margin: 3px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: normal;
    border-radius: 30px; /* Bordes redondeados */
}

.big-gray-chip-r {
    background-color: #B6B7B7;
    color: #ffffff;
}

.big-green-chip-r {
    background-color: #60B239;
    color: #ffffff;
}

</style>
