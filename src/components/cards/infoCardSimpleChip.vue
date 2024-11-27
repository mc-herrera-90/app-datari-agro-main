<template>
  <div id="infoCardSimple" >
    <v-card rounded :height="height_card">
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
        <v-chip outlined color="blue-grey darken-2" >
          {{data}}
        </v-chip>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {

  name: 'infoCardSimple',
  props:[
    'title','subtitle','data',
    'icon','data_type','height_card'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>