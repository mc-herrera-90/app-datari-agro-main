<template>
  <v-card flat :height="height">
    <v-card-title class="justify-center">
      <v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
      <h4 class="font-weight-light">{{title}}</h4>
    </v-card-title>
    <v-card-subtitle class="text-center">
      <h3 class="font-weight-bold">{{subtitle}}</h3>
    </v-card-subtitle>
    <v-card-text class="text-center">
      <h3 class="number">{{name1}}</h3>
      <h3 class="font-weight-bold mt-2">{{data1}} </h3>
      <h3 class="font-weight-bold mt-4">{{name2}}</h3>
      <h2 class="mt-2 number">{{data2}} </h2>
      <h3 class="number ">{{name3}}</h3>
      <div class="centrar mt-2">
         <v-list>
            <v-list-item 
              v-for="tag in options"
              :key="tag"
            >
              <v-list-item-content style="margin-bottom:-10px; margin-top:-10px;">
                <v-list-item-title>
                  <v-chip
                    :color="data_list.includes(check_string(tag)) ? 'teal darken-2 white--text' : 'grey lighten-2'"
                  >                        
                    {{check_string(tag) }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {resume_texts} from '../../functions/functions.js';
export default {

  name: 'infoCardList',
  props: [
    'title','subtitle','data_list','name1','name2','name3','icon',
    'data_type','height','options','data1','data2'
  ],
  data () {
    return {
      key_words: ['Tipo de software que utiliza']
    }
  },
  methods:{
    check_string(string){
      return resume_texts(string)
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
.number{
  font-size: 36px;
  color: #2F48A3;
}
</style>