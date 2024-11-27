<template>
	<v-card flat :height="height">
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
      <h4 class="font-weight-medium">{{title}}</h4>
		</v-card-title>
		<v-card-text class="text-center" style="margin-top:-15px;">
      <h2 class="font-weight-light"><small>{{name}}</small></h2>
      <div class="centrar" >
        <div v-if="tipo === 'fila' && name === '' " style="margin-top:-5px">
          <v-chip-group
          class="mt-3"
          column

          >
          <v-chip
            v-for="tag in options"
            :key="tag"
            :color="create_list(data).includes(check_string(tag)) ? color+' white--text' : 'grey lighten-2'"

          >
            {{ tag }}
          </v-chip>
        </v-chip-group>  
      </div>
      <div v-else-if="tipo === 'fila' && name !== '' " style="margin-top:-10px">
          <v-chip-group
          class="mt-3"
          column

          >
          <v-chip
            v-for="tag in options"
            :key="tag"
            :color="create_list(data).includes(check_string(tag)) ? color+' white--text' : 'grey lighten-2'"

          >
            {{ tag }}
          </v-chip>
        </v-chip-group>  
      </div>
      <div v-else>
    
        <v-list>
            <v-list-item 
              v-for="tag in options"
              :key="tag"

            >
              <v-list-item-content style="margin-top:-15px; margin-bottom:-15px;">
                <v-list-item-title>
                  <v-chip
                  :color="create_list(data).includes(check_string(tag)) ? 'deep-orange darken-2 white--text' : 'grey lighten-2'"
                  >    
                  {{ tag }}
                </v-chip>
                </v-list-item-title>
                
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </div>
        
      </div>
			<!-- <h1 class="font-weight-bold mt-3"><small>{{data}}</small></h1> -->
		</v-card-text>
	</v-card>
</template>

<script>
import {resume_texts} from '../../functions/functions.js';

export default {

  name: 'infoCardSelect',
  props: ['title','data','name','icon','data_type','options','tipo','height','color'],
  data () {
    return {
      tipo_data:this.tipo
    }
  },
  methods: {
    check_string(string){
      return resume_texts(string)
    },
    create_list(data){
      let element;
      let list_result = [];
      for (element of data){
        list_result.push(element.option)
      }
      return list_result;
    }
  }

}
</script>

<style lang="css" scoped>
.centrar{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>