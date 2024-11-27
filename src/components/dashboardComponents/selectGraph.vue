<template>
	<div id="selectGraph">

    <div v-if="selected_graph === 'card_list'">
      <infoCardListChips 
        :icon="data_properties.icon"
        :title="create_title_subtitle(data_properties.title).title"
        :subtitle="create_title_subtitle(data_properties.title).subtitle"
        :data_list="data_properties.data_list"
        :height_chart="data_properties.height_chart"
        :height_card="data_properties.height_card"
      />
    </div>
		<div v-if="selected_graph === 'card_ranking'">
			<infoCardRanking 
        :icon="data_properties.icon"
        :title="data_properties.title"
        :subtitle="data_properties.subtitle"
        :data_list="data_properties.data_list"
        :height="data_properties.height_card"
      />
		</div>
		<div v-if="selected_graph === 'ranking'">
      <groupCardChart 
        :icon="data_properties.icon"
        :title="data_properties.title"
        :var_1="data_properties.var_1"
        :data_var="data_properties.data_var_1"
        :data_chart_max="data_properties.data_list['max']"
        :data_chart_min="data_properties.data_list['min']"
        :tipo_data="data_properties.tipo_data"
        :height_card="data_properties.height_card"
        :height_chart="data_properties.data_list['max'].length > 4 ?data_properties.height_chart : '100%'"
        :select_options="data_properties.options"
      />
    </div>
    <div v-if="selected_graph === 'fill_column'">

      <infoCardFillChart
        :icon="data_properties.icon"
        :title="create_title_subtitle(data_properties.title).title"
        :subtitle="create_title_subtitle(data_properties.title).subtitle"
        :data="data_properties.data_list"
        :height_chart="data_properties.height_chart"
        :height_card="data_properties.height_card"
      />
    </div>
    <div v-if="selected_graph === 'donut'">
      <DonutChart 
        :data_chart="get_data_chart(data_properties.data_list,data_properties.title)"
        :icon="data_properties.icon"
        :width="data_properties.width_chart"
        :height_chart="data_properties.height_chart"
        :height_card="data_properties.height_card"
      />
    </div>
    <div v-if="selected_graph === 'tree_map'">
        <infoCardTreeMap
          :icon="data_properties.icon"
          :title="data_properties.title"
          :data_chart="data_properties.data_list"
          :height_card="data_properties.height_card"
          :height_chart="data_properties.height_chart"
        />
    </div>
    <div v-if="selected_graph === 'column'">
      <infoCardColumnChart
        :height_card="data_properties.height_card"
        :height_chart="data_properties.height_chart"
        :title="data_properties.title"
        :icon="data_properties.icon"
        :data_chart="get_data_chart(
          data_properties.data_list,
          'Cantidad de selecciones',
          ''
        )"
      />
    </div>
    <div v-if="selected_graph == 'pie'">
      <PieChart 
        :data_chart="get_data_chart(data_properties.data_list,data_properties.title)"
        :icon="data_properties.icon"
        :width="data_properties.width_chart"
        :height_chart="data_properties.height_chart"
        :height_card="data_properties.height_card"
      />
    </div>
    <div v-if="selected_graph == 'simple_ranking'">
      <infoCardSimpleRanking
        :title="create_title_subtitle(data_properties.title).title"
        :subtitle="create_title_subtitle(data_properties.title).subtitle"
        :icon="data_properties.icon"
        :data_1="data_properties.data_1"
        :data_2="data_properties.data_2"
      />
    </div>
    <div v-if="selected_graph == 'doble_chart_select'">
      <dobleChartSelect
        :icon="data_properties.icon"
        :title="data_properties.title"
        :data_var_1="data_properties.data_var_1"
        :data_var_2="data_properties.data_var_2"
        :height_chart="data_properties.height_chart"
        :height_card="data_properties.height_card"
        :width_chart="data_properties.width_chart"

      />
    </div>
    <div v-if="selected_graph == 'stack_column'">
      <infoCardStackColumn 
        :title="data_properties.title"
        :icon="data_properties.icon"
        :data_list="data_properties.data_list"
        :height_card="data_properties.height_card"
        :height_chart="data_properties.height_chart"
      />
    </div>
	</div>
</template>

<script>
import infoCardRanking from './infoCardRankingbyValue.vue';
import groupCardChart from './GroupCardChart.vue';
import infoCardFillChart from './infoCardFillChart.vue';
import infoCardTreeMap from './infoCardTreeMap.vue';
import infoCardColumnChart from './infoCardColumnChart.vue';
import infoCardStackColumn from './infoCardStackColumn.vue';
import infoCardSimpleRanking from './infoCardSimpleRanking.vue';
import infoCardListChips from './infoCardListChips.vue';
import dobleChartSelect from './dobleChartSelect.vue';

import DonutChart from '../charts/DonutChart.vue';
import PieChart from '../charts/PieChart.vue';




export default {

  name: 'selectGraph',
  props:[
  	'selected_graph',
    'data_properties'
  ],
  components:{
  	infoCardRanking,
    groupCardChart,
    infoCardFillChart,
    infoCardTreeMap,
    infoCardColumnChart,
    infoCardSimpleRanking,
    infoCardStackColumn,
    infoCardListChips,
    dobleChartSelect,
    DonutChart,
    PieChart
  },
	data () {
    return {

    }
  },
  methods:{
     create_title_subtitle(variable){
      
      let result = {};



      if ( variable === 'Adquisición nuevos computadores en los últimos cinco años'){
        result = {
          'title': 'Adquisición computadores',
          'subtitle': 'Últimos 5 años'
        }
       }


       else if( variable === 'Sin PRC'){
        result = {
          'title': 'PRC',
          'subtitle': 'Comunas sin PRC'
        }
       }
       else if ( variable === 'Posee SIG para su catastro digital'){
        result = {
          'title': 'SIG',
          'subtitle': 'para catastro digital'
        }
      }

      else if(variable === 'Modalidad de atención de público durante pandemia'){
        result = 'Modalidad de atención'
      }

      else if(variable === 'PRC En modificación'){
         result = {
          'title': 'PRC',
          'subtitle': 'Modificación'
        }
      }
      else{
        result = variable
      }

      return result
    },

    get_data_chart(data_list, variable,tipo_data){
      let serie = [];
      let categories = [];
      let title = this.create_title_subtitle(variable);
      let name = tipo_data;
      let colors = [
        '#0069c0',
        '#001970',
        '#00695c',
        '#d81b60',
        '#b91400',
        '#373737'
      ]

      let element;

      for (element of data_list){
        let cant = element.cant;
        let option = element.option;

        if(option === 'Reuniones por Zoom o Teams'){
          option='Reuniones en linea'
        }

        serie.push(cant)
        categories.push(option)
      }

      return {
        serie: serie,
        categories: categories,
        title: title,
        name:name,
        data_type:name,
        colors: colors.slice(0,serie.length)
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>