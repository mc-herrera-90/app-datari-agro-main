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
    <v-card-text class="text-center">
      <div v-for="item in data_list">
        <div v-if="!(key_words.includes(item.text))">
          <h3 class="font-weight-light">{{item.text}}</h3>
          <h3 class="font-weight-medium mt-2 mb-2">{{item.value}}</h3>
        </div>
      </div>
      <div id="list" class="mt-6">
        <h3 class="font-weight-light">{{key_words[0]}}</h3>

        <div class="ml-10 mt-4">
        <v-chip-group
         
          column
        >
          <v-chip
            v-for="tag in list"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </div>
      </div>    
    </v-card-text>
  </v-card>
</template>

<style lang="css" scoped>
.centrar{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<script>
export default {

  name: 'infoCardList2',
  props: ['title','data_list','name','icon','data_type','height'],
  data () {
    return {
      key_words: ['Tipo de software que utiliza'],
      list:[]
    }
  },
  mounted(){
    let keyword = this.key_words[0];
    this.list = this.get_list(this.data_list,keyword);
  },
  computed:{
    updateList(){
      return this.data_list;
    }
  },
  watch:{
    updateList(){
      let keyword = this.key_words[0];
      this.list = this.get_list(this.data_list,keyword);
    }
  },
  methods:{
    get_list(data,keyword){
      let data_detail = data.find(o => o.text === keyword);
      let list = this.create_list(data_detail.value);
      return list;
    },

    create_list(data){
      if(data.includes(',')) {
        let temp = data.split(',')
        return temp
      }
      else{
        return [data]
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>