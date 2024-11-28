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
        <div id="body-wrapper" class="mt-2">
                <div id="body-wrapper-left">
                    <div id="left-panel-1">
                    <v-card class="text-center" id="ubicacion">
                            <h4 class="gray-font">
                                Ubicación
                            </h4>
                            <p class="blue-color">
                                {{ generalData.productor.ubicacion_predio }}
                            </p>
                    </v-card>
                    <v-card id="productos">
                        <h4 class="gray-font">Productos</h4>
                                <TreeMap
                                :data="maptreeData"
                                />
                    </v-card>
                    </div>
                    <div id="left-panel-2">
                        <v-card>
                            <div class="d-flex">
                                <div id="capital-humano-wrapper">
                                    <h4 class="gray-font">Capital Humano</h4>
                                    <p class="gray-font">Total Trabajadores</p>
                                    <div class="gray-font">(cantidad)</div>
                                    <p class="blue-color">{{generalData.trabajadores.total  }}</p>
                                </div>
                                <div id="formacion-wrapper">
                                    <h4 class="gray-font">Formación</h4>
                                        <div class="chips-container">
                                            <div>
                                                <span
                                                    :class="generalData.trabajadores.postgrado > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >Postgrado</span>
                                                <span
                                                    :class="generalData.trabajadores.postgrado > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.postgrado }}</span>
                                            </div>
                                            <div>
                                                <span
                                                    :class="generalData.trabajadores.pregrado > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >Pregrado</span>
                                                <span
                                                    :class="generalData.trabajadores.pregrado > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.pregrado }}</span>
                                                </div>
                                                <div>
                                                <span
                                                    :class="generalData.trabajadores.media > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >E. Media</span>
                                                <span
                                                    :class="generalData.trabajadores.media > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.media }}</span>
                                                </div>
                                                <div>
                                                <span
                                                    :class="generalData.trabajadores.basica > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >E. Básica</span>
                                                <span
                                                    :class="generalData.trabajadores.basica > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.basica }}</span>
                                                </div>
                                        </div>
                                </div>
                                <div id="capacitacion-wrapper">
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
                                </div>
                            </div>
                        </v-card>
                    </div>
                            <v-card height="338">
                                <p class="gray-font-title1 ml-6">Comercialización</p>
                                <PieChart
                                :data_chart="PieChartData"  
                                :height="200"
                                :height_chart="200"
                                :key="selectedProducer"
                                />
                            </v-card>

                                    <v-card class="pa-0 text-center" height="155">
                                        <p class="gray-font-subtitle ma-0 pa-0">Producción</p>
                                        <p class="gray-font-text-ligth ma-0 pa-0">(todos los productos)</p>
                                        <p class="gray-font-text ma-0 pa-0">Total anual (TON)</p>
                                        <p class="blue_number mb-0">{{ generalData.cultivos.total_produccion_anual.replace(".",",") }}</p>
                                    </v-card>
                                    <v-card class="pa-0" height="175">
                                    <p class="gray-font-subtitle text-center ma-0 pa-0">Evolución producción</p>
                                    <p class="gray-font-text-ligth text-center ma-0 pa-0">(Últimos 5 años)</p>
                                    <div class="chips-container">
                                        <span :class="generalData.cultivos.evolucion_produccion === 3 ? 'blue-chip' : 'gray-chip'" label>Aumento</span>
                                        <span :class="generalData.cultivos.evolucion_produccion === 2 ? 'blue-chip' : 'gray-chip'" label>Igual</span>
                                        <span :class="generalData.cultivos.evolucion_produccion === 1 ? 'blue-chip' : 'gray-chip'" label>Disminución</span>
                                    </div>
                                </v-card>
                </div>
                <div id="body-wrapper-right">
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
                            <v-card height="400" class="text-center d-flex flex-column align-start">
                                <p class="gray-font-title1 ml-4 mt-1">Percepción</p>
                                <p class="gray-font-subtitle ml-4 ma-0  ">Prácticas Agrícolas</p>
                                <StackColumnVertical
                                :height_chart="290"
                                :data_chart="chartSeries"
                                />
                            </v-card>
                            <v-card height="165">
                                <p class="gray-font-title1 ma-0 ml-3">Gestión de Residuos</p>
                                    <!-- Gestión de Residuos Orgánicos -->
                                    <p class="gray-font-text ml-4">
                                        Realiza Gestión Residuos Orgánicos
                                    </p>
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
                                    <!-- Gestión de Residuos No Orgánicos -->
                                    <p class="gray-font-text ml-3">
                                        Realiza Gestión Residuos No Orgánicos
                                    </p>
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
                                </v-card>
                            <v-card height="165" class="text-center">
                                <p class="gray-font-subtitle ma-0">Consumo agua</p>
                                <p class="gray-font-text">Total anual(M3)</p>
                                <p class="blue_number">{{ generalData.cultivos.consumo_anual_agua.replace(".",",") }}</p>
                            </v-card>
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
            </div>
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
#DetallesView {
    height: 100%;
    overflow: hidden;
}

#body-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;
    height: 100%;
    width: 100%;
}

/* left side */
#body-wrapper-left {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    #left-panel-1 {
    display: flex;
    width: 100%;
    border: 1px solid red;
    height: auto;
    gap: 5px;
    #ubicacion,
    #productos {
        width: 100%;
    }
    #ubicacion {
        display: flex;
        flex-direction: column;
        /* border: 10px solid green; */
        padding: 5px;
        height: auto;
        p, h4 {
            font-weight: bold;
            font-size: 1.7vw;
        }
        p {
            margin: auto 0;
        }
    }
    #productos {
        display: flex;
        flex-direction: column;
        /* border: 10px solid pink; */
        padding: 5px;
        height: auto;
        h4 {
            font-size: 1.7vw;
        }
        }
    }
    #left-panel-2 {
        border: 3px solid black;

        #capital-humano-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;
            h4 {
                font-size: 1.6vw;
            }
            p {
                font-size: 1.2vw;
                font-weight: bold;
            }
            div {
                font-size: 1vw;
            }
        }

        #formacion-wrapper {
            width: 100%;
            text-align: center;
            h4 {
                font-size: 1.2vw;
            }
            .chips-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 5px 10%;
                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span:nth-child(1) {
                        width: 60%;
                        display: block;
                        margin-right: 4px;
                    }
                }
            }

        }
            #capacitacion-wrapper {
            width: 100%;
            border: 1px solid red;
        }

   } 
}


/* right side */



#body-wrapper-right {
    width:100%;
}

.gray-font {
    color: #7F7F7F;
}
.gray-color {
    color: #c1c2bc;
}

.pill-blue, .pill-gray {
    padding: 5px 10px;
    border-radius: 1rem;
    color: #fff;
}
.pill-blue {
    background: #3550b8;

}
.pill-gray {
    background: #c1c2bc;
}

</style>
