<template>
	<v-card flat :height="height_card">
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
			<h4 class="font-weight-medium">{{title}}</h4>
		</v-card-title>
		<v-card-text class="text-center">
			<!-- <h3 class="font-weight-light">{{var_1}}</h3> -->
			<h2 class="font-weight-medium" :style="data_var != '' ? '' : 'margin-top:-20px;'">{{data_var}}</h2>
      <h3 class="font-weight-light mt-2">{{tipo_data}}</h3>
      <div id="ranking" class="mt-2">
        <div class="container">
          <h3 class="font-weight-medium"> 
            {{selected_text}} {{tipo_data}}
          </h3>
          <div
           :class="data_chart_result.serie.length <= 4 ? '' : 'content'"
            
          > 
            <div id="raking_chart" >
              <RankingChart 
                :data_chart="data_chart_result" 
                :height="height_chart" 
                :style="data_chart_result.serie.length <= 4 ? 'margin-top:-20px;' : 'margin-top:-35px;'"
              />
            </div>
          </div>
        </div>

        <div style="visibility: hidden">
          besto solucion
        </div>
     </div>
      <div class="centrar" >
        <v-slide-group
          v-model="selected_option"
          dense
          center-active
          mandatory>
          <v-slide-item
            v-for="(item,i) in select_options"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-btn
              :color="active ? 'primary white--text' : 'grey lighten-1'"
              height="30"
              small
              class="mt-3 ma-1"
              @click="onCardClick(item,i)"
            >
              <h4 class="font-weight-medium">{{item}}</h4>
            </v-btn>
          </v-slide-item>
         </v-slide-group>
        </div>
		</v-card-text>
	</v-card>
</template>


 <style lang="css" scoped>
.container{
  float:right;
  height: 145px;
  width:100%; 
  padding:0px; 
  background:  #fff;
  z-index:0;
  
}
.content{

  height:120px;
  margin-top:10px;
  overflow-y:auto;
  background:#fff;
  scrollbar-width:thin;
}
 </style>
<script>
import {get_data_columnchart} from '../../functions/chartFunctions.js';
import RankingChart from '../charts/RankingChart.vue';
export default {

  name: 'GroupCardChart',
  props:['icon','title','data_var','var_1','data_chart_max','data_chart_min','tipo_data','height_card','height_chart','select_options'],
  components:{
  	RankingChart
  },
  data () {
    return {
    	data_chart_result_max:null,
      data_chart_result_min:null,
      selected_option: 0,
      selected_text:null
    }
  },
 created(){
    this.selected_text = this.select_options[0];
    this.data_chart_result = this.get_data_chart(this.data_chart_max);
     
  },
  computed:{
    updateCard(){
      return this.data_var
    }

  },
  watch:{
    updateCard(){
      this.data_chart_result = this.get_data_chart(this.data_chart_max);
    }
  },
  methods:{
  	get_data_chart(data){
  		let result = get_data_columnchart(data);
  		result.name = this.tipo_data;
  		result.title = '';

  		return result

  	},
    onCardClick(item,n){
      this.selected_text = item;
      this.selected_option = n ;

      if(n === 0){
        this.data_chart_result = this.get_data_chart(this.data_chart_max)
      }
      else if(n === 1){
        this.data_chart_result = this.get_data_chart(this.data_chart_min)

      }
    },
  }
}
</script>

<style lang="css" scoped>
.centrar{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:-10px;
}
</style>