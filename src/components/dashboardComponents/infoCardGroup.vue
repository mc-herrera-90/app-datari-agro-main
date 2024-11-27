<template>
	<v-card flat :height="height">
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
      <h3 class="font-weight-medium">{{title}}</h3>
		</v-card-title>
		<v-card-text class="text-center" >
			<h2 class="font-weight-light">{{name_2}}</h2>
			<h2 class="font-weight-bold mt-3">{{data_2}}</h2>
			<h2 class="font-weight-light mt-5">{{name_1}}</h2>
			<div class="mt-0" >
        <v-list>
        
            <v-list-item 
              v-for="tag in data_1"
              :key="tag"
            >
              <v-list-item-content style="margin-top:-15px; margin-bottom:-10px;">
                <v-list-item-title>
                  <v-chip outlined color="primary">
                    <div v-if="typeof(tag) === 'object'">
                      {{tag.option}}
                    </div>
                  <div v-else-if="tag.length >= 25">
                        
                      {{ check_string(tag) }}
                   
                    </div>
                    <div v-else>
                      {{ tag }}
                    </div>
                </v-chip>
                </v-list-item-title>
                
              </v-list-item-content>
            </v-list-item>
        </v-list>





      <!--   <v-chip-group
          
          column
        >
          <v-chip
            v-for="tag in data_1"
            :key="tag"

          >
          <div v-if="tag.length >= 25">
              
            {{ check_strings(tag) }}
         
          </div>
          <div v-else>
            {{ tag }}
          </div>

          </v-chip>
        </v-chip-group> -->
      </div>
			
			
		</v-card-text>
	</v-card>
</template>

<style lang="css" scoped>
.centrar{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:10px;
}
</style>

<script>
import {resume_texts} from '../../functions/functions.js';

export default {

  name: 'infoCardGroup',
	props: ['title','data_1','data_2','icon','data_type','name_1','name_2','height'],
  components:{

  },
  data () {
    return {

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
</style>