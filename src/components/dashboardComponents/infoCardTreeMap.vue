<template>
	<div id="infoCardTreeMap">
        <h4 class="gray-font-title" style="padding: 0; margin:0;">
          {{title}}
        </h4>
        <TreeMap
          :data="data_chart"
          :height="'100%'"
          :width="'100%'"
        />
	</div>
</template>

<script>
import TreeMap from '../charts/TreeMap.vue';

export default {

  name: 'infoCardTreeMap',
  props:[
    'title','data','height_card',
    'height_chart'
  ],
  components:{
    TreeMap
  },
  data () {
    return {
      data_chart:[]
    }
  },
  mounted(){
    const predata = this.get_predata_chart(this.data);
    this.data_chart = this.get_data_chart(predata);
  },
  computed:{
    updateData(){
      return this.data;
    }
  },
  watch:{
    updateData(){
      const predata = this.get_predata_chart(this.data);
      this.data_chart = this.get_data_chart(predata);
    }
  },

  methods:{

    get_predata_chart(data) {
      if (!Array.isArray(data)) {
        return []; // Retorna un array vacío si data no es un array
      }

      return data.map(element => ({
      option: element.option || 'Unknown', // Usa 'Unknown' si 'option' es undefined
      cant: element.cant || 1, // Usa 1 si 'cant' es undefined
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

      let colors = [
        '#62B238', //Pimiento
        '#F4731B', //Aji
        '#C35B1B', //Datil
        '#DC1933', //Tomate
        '#488A29', //Aceituna
        '#F31C17', //Tomate Cherry
        '#FAD829', //Maiz
        '#3ABB5C', //Albahaca
        '#E1BF26', //Maracuya
        '#EB8180', //Guayaba
        '#E6ED6F', //Limon
        '#E7A6E1', //Ajo
        '#2A7629', //Berenjena
        '#44B443', //Oregano
        '#9DE080', //Pepino
      ];
      let serie = data.map((element, index) => ({
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
  }

  }
}
</script>

<style lang="css" scoped>
#infoCardTreeMap {
  padding: 0 !important;
  margin: 0 !important;
}
.gray-font-title{
  padding: 0;
  margin: 0 !important;
  color: #7F7F7F;
  font-size: 1.2vw;
  font-weight: bold;
}
</style>