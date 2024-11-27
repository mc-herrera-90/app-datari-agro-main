<template>
  <div id="infoCardListChipsSelect">
    <v-card rounded :height="height_card">
      <v-card-title>
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
      <v-card-text class="centrar text-center">
        <v-list>
          <v-list-item
          style="margin-top:-14px; margin-bottom:-14px;"
            v-for="(option,i) in options"
            :key="i"
          >
          <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    dark
                    :color="list_options.includes(option) ? color : 'grey lighten-2 black--text'"
                  >
                    {{option}}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
          
            <!-- {{option in create}} -->
          
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="css" scoped>
.centrar{
    margin-top:0px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<script>
export default {

  name: 'infoCardListChipsSelect',
  props: [
    'data_list','title','subtitle','icon',
    'height_card','height_chart','options',
    'color'
  ],
  data () {
    return {
      list_options:[]
    }
  },
  mounted(){
    this.list_options = this.create_list(this.data_list)
  },
  computed:{
    update_data(){
      return this.data_list;
    }
  },
  watch:{
    update_data(){
      this.list_options = this.create_list(this.data_list)  
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