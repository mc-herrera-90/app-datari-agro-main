<template>
  <div id="infoCardSimple">
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
      <v-card-text>
        <h1 class="font-weight-bold">{{data}}</h1>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {

  name: 'infoCardSimple',
  props:[
    'title','subtitle','data',
    'icon','data_type','height'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>