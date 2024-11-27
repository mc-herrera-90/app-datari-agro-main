<template>
	<div id="infoCardTreeMap">
		<v-card>
      <v-card-title class="justify-left pa-1 ml-3">
        <h4 class="gray-font-title">
          {{ title }}
        </h4>
      </v-card-title>
      <v-card-text>
        <TreeMap 
          style="margin-top:-30px;"
          :data="data_chart"
          :height="height_chart"
          :width="'100%'" 
          ref="treeMap"
        />
      </v-card-text>
    </v-card>
	</div>
</template>

<script>
import TreeMap from '../charts/TreeMap.vue';

export default {
  name: 'infoCardTreeMap',
  props: [
    'title', 'icon', 'data', 'height_card',
    'height_chart'
  ],
  components: {
    TreeMap
  },
  data() {
    return {
      data_chart: []
    };
  },
  mounted() {
    const predata = this.get_predata_chart(this.data);
    this.data_chart = this.get_data_chart(predata);
    this.updateChart(); // Inicializa el gráfico con los datos iniciales
  },
  watch: {
    data_chart: {
      handler() {
        this.updateChart();
      },
      deep: true, // Permite detectar cambios profundos en el objeto data_chart
    },
  },
  methods: {
    get_predata_chart(data) {
      if (!Array.isArray(data)) {
        return []; // Retorna un array vacío si data no es un array
      }
      return data.map(element => ({
        option: element.option || 'Unknown',
        cant: element.cant || 1,
        producto: element.producto || '',
        pertinencia: element.pertinencia || '',
        practica: element.practica || '',
        sellos: element.sellos || '',
        produccion: element.produccion || ''
      }));
    },
    get_data_chart(data) {
      if (!Array.isArray(data)) {
        return {
          serie: [],
          labels: [],
          colors: []
        };
      }

      const colors = [
        '#62B238', '#F4731B', '#C35B1B', '#DC1933', '#488A29', 
        '#F31C17', '#FAD829', '#3ABB5C', '#E1BF26', '#EB8180', 
        '#E6ED6F', '#9DE080', '#44B443', '#2A7629', '#E7A6E1'
      ];

      const serie = data.map((element, index) => ({
        x: element.option === 'Correo Electrónico' ? 'Email' : element.option,
        y: element.cant,
        producto: element.producto,
        pertinencia: element.pertinencia,
        practica: element.practica,
        sellos: element.sellos,
        produccion: element.produccion
      }));

      serie.sort((a, b) => (a.y < b.y ? 1 : -1));

      return {
        serie,
        labels: serie.map(item => item.x),
        colors: colors.slice(0, serie.length)
      };
    },
    updateChart() {
      if (this.$refs.treeMap && this.data_chart) {
        // Actualiza el gráfico TreeMap
        this.$refs.treeMap.updateOptions({
          series: this.data_chart.serie,
          labels: this.data_chart.labels,
          colors: this.data_chart.colors
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
  .gray-font-title {
    padding: 0;
    margin: 0;
    color: #7F7F7F;
    font-size: 30px;
    font-weight: bold;
  }
</style>
