<template>
	<div>
		<v-card rounded>
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
      <v-card-subtitle>
       <h3 class="font-weight-light">{{subtitle}}</h3>
      </v-card-subtitle>
      <v-card-text style="margin-top:-10px;">
      	<v-chip-group
      		column
      	>
      		<v-chip
      		dark
	      		v-for="(option,i) in options"
	      		:key="i"
	      		:color="list_options.includes(option) ? color : 'grey lighten-2 black--text'"
	      	>
      			{{option}}
      		</v-chip>
      	</v-chip-group>
      </v-card-text>
    </v-card>
	</div>
</template>

<script>
export default {

  name: 'infoCardSimpleChipsSelect',
	props:[
    'title','subtitle','data','options',
    'icon','data_type','height','color'
  ],
  data () {
    return {
      list_options:[]
    }
  },
  mounted(){
    this.list_options = this.create_list(this.data)
  },
  computed:{
    update_data(){
      return this.data;
    }
  },
  watch:{
    update_data(){
      this.list_options = this.create_list(this.data)  
    }
  },

  methods:{
    create_list(data_list){
      return data_list.map(e => e.option);
    }
  }

}
</script>

<style lang="css" scoped>
</style>