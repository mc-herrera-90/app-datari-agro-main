<template>
	<div id="infoCardTreeMap">
		<v-card>
      <v-card-title class="justify-left">
        <v-icon
          
          left
          >
          {{icon}}
        </v-icon>
        <h4 class="font-weight-medium">
          {{title}}
        </h4>
      </v-card-title>
      <v-card-text>
        <TreeMap 
          style="margin-top:-30px;"
          :data="data_chart"
          :height="height_chart"
          :width="'100%'" 
        />
      </v-card-text>
    </v-card>
	</div>
</template>

<script>
import TreeMap from '../charts/TreeMap.vue';

export default {

  name: 'infoCardTreeMap',
  props:[
    'title','icon','data','height_card',
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

    get_predata_chart(data){
      let element;
      const array_final = [];

      for (element of data){
        
        let temp = {
          option: element.option,
          cant: 1
        }

        array_final.push(temp);
      }

      return array_final;

    },

    get_data_chart(data){
      let colors = [
        '#0069c0',
        '#001970',
        '#00695c',
        '#d81b60',
        '#b91400',
        '#373737'
      ];
      let element;
      let serie = [];
      let labels = [];

      for (element of data){
        let value = element.cant;
        let option = element.option;

        if( option == 'Correo Electrónico' ){
          option = 'Email'
        }

        let temp = {
          x: option,
          y: value
        }

        labels.push(option)

        serie.push(temp)
      }


      serie.sort((a,b) => (a.y < b.y) ? 1: -1)
      
      return {
        serie:serie,
        labels:labels,
        colors:colors.slice(0,serie.length)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>