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
        <div class="mt-2">
                    <!-- Primera mitad -->
                    <div class="d-flex" style="gap: 5px; width: 100%;">
                    <div class="d-flex flex-column" style="width: 100%; gap: 3px">
                        <div class="d-flex" style="width: 100%; gap: 3px;">
                            <v-card class="text-center d-flex flex-column py-2" id="ubicacion" style="width: 30%">
                            <h4 class="gray-font text-h5">
                                <b>Ubicación</b>
                            </h4>
                            <p class="blue-color" style="color:#3550b8; font-size: 1.6vw;margin: auto 0">
                                <b>{{ generalData.productor.ubicacion_predio }}</b>
                            </p>
                    </v-card>
                    <v-card id="productos" class="py-2 px-2" style="width: 100%; height: 100%;">
                        <h4 class="gray-font text-h5"><b>Productos</b></h4>
                                <TreeMap
                                :data="maptreeData"
                                />
                    </v-card>
                    </div>
                    <div style="height: 100%; margin-bottom: 3px">
                        <v-card style="height: 100%">
                            <div class="d-flex">
                                <div id="capital-humano-wrapper" class="text-center" style="width: 100%; height: 100%; padding: 5px">
                                    <h4 class="gray-font text-h5"><b>Capital Humano</b></h4>
                                    <p class="gray-font"><b>Total Trabajadores</b></p>
                                    <div class="gray-font">(cantidad)</div>
                                    <p class="blue-color text-h4" style="color: #3550b8"><b>{{generalData.trabajadores.total  }}</b></p>
                                </div>
                                <div id="formacion-wrapper" class="text-center d-flex flex-column" style="width: 100%; justify-content: center; align-items: center;">
                                    <h4 class="gray-font text-h6"><b>Formación</b></h4>
                                        <div class="d-flex flex-column" style="gap: 5px">
                                            <div class="d-flex" style="align-items: center; gap: 5px">
                                                <span
                                                    style="width: 100px"
                                                    :class="generalData.trabajadores.postgrado > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >Postgrado</span>
                                                <span
                                                    :class="generalData.trabajadores.postgrado > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.postgrado }}</span>
                                            </div>
                                            <div class="d-flex" style="align-items: center; gap: 3px">
                                                <span
                                                    style="width: 100px"
                                                    :class="generalData.trabajadores.pregrado > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >Pregrado</span>
                                                <span
                                                    :class="generalData.trabajadores.pregrado > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.pregrado }}</span>
                                                </div>
                                                <div class="d-flex" style="align-items: center; gap: 3px">
                                                <span
                                                    style="width: 100px"
                                                    :class="generalData.trabajadores.media > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >E. Media</span>
                                                <span
                                                    :class="generalData.trabajadores.media > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.media }}</span>
                                                </div>
                                                <div class="mb-1 d-flex" style="align-items: center; gap: 3px">
                                                <span
                                                    style="width: 100px"
                                                    :class="generalData.trabajadores.basica > 0 ? 'pill-blue' : 'pill-gray'"
                                                    label
                                                >E. Básica</span>
                                                <span
                                                    :class="generalData.trabajadores.basica > 0 ? 'blue-color' : 'gray-color'"
                                                >{{ generalData.trabajadores.basica }}</span>
                                                </div>
                                        </div>
                                </div>
                                <div id="capacitacion-wrapper" class="text-center" style="width: 100%;">
                                    <h4 class="gray-font text-h6"><b>Capacitación</b></h4>
                                    <div class="d-flex flex-column" style="align-items: center;">
                                        <span class="gray-font">(Frecuencia cap. BPA)</span>
                                        <span
                                        style="width: 100px"
                                        :class="generalData.trabajadores.frecuencia_capacitacion[0].frecuencia_capacitacion_bpa ? 'pill-blue' : 'pill-gray'"
                                        label
                                        >
                                        {{ generalData.trabajadores.frecuencia_capacitacion[0].frecuencia_capacitacion_bpa || 'N/A' }}
                                        </span>
                                        
                                        <span class="gray-font">(Frecuencia cap. Seguridad)</span>
                                        <span
                                        style="width: 100px"
                                        :class="generalData.trabajadores.frecuencia_capacitacion_seguridad[0].frecuencia_capacitacion_seguridad ? 'pill-blue' : 'pill-gray'"
                                        label
                                        >
                                        {{ generalData.trabajadores.frecuencia_capacitacion_seguridad[0].frecuencia_capacitacion_seguridad || 'N/A' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </div>
                    </div>
                       <div id="right-panel-1" class="d-flex mb-1" style="width: 100%; gap: 4px">
                        <v-card class="raiting py-1 px-1" style="width: 65%;">
                                <h4 class="gray-font text-h5"><b>Rating</b></h4>
                                <p class="gray-font"><b>Productores</b></p>
                                <p class="gray-font">Buenas Prácticas Sostenibilidad Agrícola (BPSA)</p>
                                <div style="width: 100%; height: 100%; overflow: hidden;">
                                    <v-img
                                    :src="generalData.productor && generalData.productor.ranking_bpsa
                                        ? require(`../media/rating_${generalData.productor.ranking_bpsa}.svg`)
                                        : require('../media/rating_F.svg')"
                                    alt="Ranking BPSA"
                                    max-width="500"
                                    max-height="300"
                                    style="transform: scale(1.8); object-fit: contain;"
                                    contain
                                    ></v-img>

                                </div>
                        </v-card>
                            <v-card class="percepcion" style="padding: 3px; width: 38%">
                                <h4 class="gray-font text-h5"><b>Percepción</b></h4>
                                <p class="gray-font"><b>Prácticas Agrícolas</b></p>
                                <StackColumnVertical
                                :height_chart="290"
                                :data_chart="chartSeries"
                                />
                            </v-card>
                        </div>
                        </div>
                    <!-- Segunda mitad -->
                    <div class="d-flex" style="width: 100%; gap: 5px;">
                        <div class="d-flex" style="width: 50%; gap: 5px">
                            <v-card style="width: 75%; padding: 10px;" id="comercializacion">
                                <h4 class="gray-font text-h6"><b>Comercialización</b></h4>
                                <PieChart
                                :data_chart="PieChartData"
                                :key="selectedProducer"
                                />
                            </v-card>
                            <div clas="d-flex flex-column" style="width: 35%;">
                            <v-card id="produccion" class="text-center d-flex flex-column mb-1">
                                <h4 class="gray-font"><b>Producción</b></h4>
                                <p class="gray-font" style="line-height: normal">(todos los productos)</p>
                                <p class="gray-font">Total anual (TON)</p>
                                <p class="blue-color text-h5" style="color: #3550b8; line-height: normal;"><b>{{ generalData.cultivos.total_produccion_anual.replace(".",",") }}</b></p>
                            </v-card>
                            <v-card class="text-center d-flex flex-column px-2 py-2"  id="evaluacion">
                            <h4 class="gray-font"><b>Evolución producción</b></h4>
                            <p class="gray-font">(Últimos 5 años)</p>
                            <div class="d-flex flex-column" style="gap: 2px; width: 75%; margin: auto">
                                <div
                                :class="generalData.cultivos.evolucion_produccion === 3 ? 'pill-blue' : 'pill-gray'" label>Aumento</div>
                                <div :class="generalData.cultivos.evolucion_produccion === 2 ? 'pill-blue' : 'pill-gray'" label>Igual</div>
                                <div :class="generalData.cultivos.evolucion_produccion === 1 ? 'pill-blue' : 'pill-gray'" label>Disminución</div>
                            </div>
                        </v-card>
                        </div>
                        </div>
                        <div class="d-flex flex-column" style="width: 50%; gap: 5px; justify-content: space-between;">
                        <div id="right-panel-2" class="d-flex" style="gap: 5px;height: 100%;">
                            <v-card class="residuos px-1 py-1" style="width: 65%">
                                <h4 class="gray-font text-h5"><b>Gestión de Residuos</b></h4>
                                <div class="d-flex" style="width: 100%; justify-content: space-around">
                                    <div class="d-flex flex-column" style="gap: 2px">
                                        <div class="gray-font">
                                            Realiza
                                        </div>
                                        <div class="gray-font">
                                            Gestión
                                        </div>
                                        <div class="gray-font">
                                            Residuos
                                        </div>
                                        <div class="gray-font">
                                            Orgánicos
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column text-center" style="gap: 3px">
                                        <span
                                        :class="generalData.residuos.gestion_organicos === 3 ? 'pill-green' : 'pill-gray'"
                                        >
                                        Siempre
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_organicos === 2 ? 'pill-green' : 'pill-gray'"
                                        >
                                        A veces
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_organicos === 1 ? 'pill-green' : 'pill-gray'"
                                        >
                                        Nunca
                                        </span>
                                    </div>
                                                     <div class="d-flex flex-column">
                                        <div class="gray-font">
                                            Realiza
                                        </div>
                                        <div class="gray-font">
                                            Gestión
                                        </div>
                                        <div class="gray-font">
                                            Residuos
                                        </div>
                                        <div class="gray-font">
                                            Orgánicos
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column text-center" style="gap: 3px">
                                        <span
                                        :class="generalData.residuos.gestion_no_organicos === 3 ? 'pill-green' : 'pill-gray'"
                                        >
                                        Siempre
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_no_organicos === 2 ? 'pill-green' : 'pill-gray'"
                                        >
                                        A veces
                                        </span>
                                        <span
                                        :class="generalData.residuos.gestion_no_organicos === 1 ? 'pill-green' : 'pill-gray'"
                                        >
                                        Nunca
                                        </span>
                                    </div>
                                    </div>
             
                                </v-card>
                            <v-card class="text-center py-1" style="width: 40%;">
                                <h4 class="gray-font text-h6"><b>Consumo agua</b></h4>
                                <p class="gray-font-text">Total anual(M3)</p>
                                <p class="blue-color text-h4" style="color: #3550b8"><b>{{ generalData.cultivos.consumo_anual_agua.replace(".",",") }}</b></p>
                            </v-card>
                        </div>
                        <div id="right-panel-3" class="d-flex" style="gap: 5px; height: 100%">
                            <v-card style="width: 33%; align-items: center" class="d-flex flex-column">
                                <h4 class="gray-font text-h6"><b>Certificaciones</b></h4>
                                <div class="d-flex mt-3" style="gap: 5px">
                                    <span
                                        style="background: #52b120; padding: 10px; color: #fff"
                                        :class="{ 'square-green': generalData.certificaciones[0] !== 'No tiene' }"
                                    >
                                        Sí
                                    </span>
                                    <!-- Botón para "No" -->
                                    <span
                                        style="background: #c1c2bc; padding: 10px; color: #fff"
                                        :class="{ 'square-green': generalData.certificaciones[0] === 'No tiene' }"
                                    >
                                        No
                                    </span>
                                </div>
                                </v-card>
                                    <v-card style="width: 33%" class="text-center">
                                    <h4 class="gray-font text-h6"><b>Trazabilidad</b></h4>
                                    <div class="d-flex mt-3" style="gap: 5px; justify-content: center">
                                    <span
                                        style="background: #52b120; padding: 10px; color: #fff"
                                        :class="{ 'square-green': generalData.certificaciones[0] !== 'No tiene' }"
                                    >
                                        Sí
                                    </span>
                                    <!-- Botón para "No" -->
                                    <span
                                        style="background: #c1c2bc; padding: 10px; color: #fff"
                                        :class="{ 'square-green': generalData.certificaciones[0] === 'No tiene' }"
                                    >
                                        No
                                    </span>
                                </div>
                                </v-card>
                                    <v-card style="width: 33%" class="text-center px-2 pb-2">
                                    <h4 class="gray-font text-h6"><b>Registro</b></h4>
                                    <div class="d-flex flex-column" style="gap: 3px">
                                        <span
                                        style="font-size: .8vw"
                                        :class="generalData.trazabilidad.forma_registro === 3 ? 'pill-green' : 'pill-gray'"
                                        >
                                        Cuaderno C. Digital
                                        </span>
                                        <span
                                        style="font-size: .8vw"
                                        :class="generalData.trazabilidad.forma_registro === 2 ? 'pill-green' : 'pill-gray'"
                                        >
                                        Cuaderno C. Impreso
                                        </span>
                                        <span
                                        style="font-size: .8vw"
                                        :class="generalData.trazabilidad.forma_registro === 1 ? 'pill-green' : 'pill-gray'"
                                        >
                                        No realiza
                                        </span>
                                    </div>
                                    </v-card>
                            <v-card style="width: 33%;align-items: space-evenly" class="text-center py-1 d-flex flex-column">
                            <h4 class="gray-font mb-3"><b>Frecuencia registro</b></h4>
                            <div class="d-flex" style="justify-content: space-evenly">
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
}


#img-rating {
    background: url('../media/raiting_E-adjust.png');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    height: 72%;
}
.gray-font {
    color: #7F7F7F;
}
.gray-color {
    color: #c1c2bc;
}

.pill-blue, .pill-gray, .pill-green{
    padding: 5px 10px;
    border-radius: 1rem;
    color: #fff;
}
.pill-blue {
    background: #3550b8;

}
.pill-gray, .rounded-gray {
    background: #c1c2bc;
    color: #fff;
}
.pill-green,.rounded-green {
    background: #52b120;
    color: #fff;
}
.rounded-green, .rounded-gray {
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;

}


</style>
