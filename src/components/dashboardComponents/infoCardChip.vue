<template>
	<v-card flat>
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
      <h4 class="font-weight-medium">{{title}}</h4>
		</v-card-title>
    <v-card-subtitle class="text-center">
      <h3 class="font-weight-medium">{{subtitle}}</h3>
    </v-card-subtitle>
		<v-card-text class="text-center" style="margin-top:-15px;">
      <!-- <h2 class="font-weight-light"><small>{{name}}</small></h2> -->
      <v-chip outlined class="mt-2" color="blue-grey darken-2" >
      	{{data_chip}}
      </v-chip>
		<!-- 	<h1 class="font-weight-bold mt-3"><small>{{data_chip}}</small></h1> -->
		</v-card-text>
	</v-card>
</template>

<script>
export default {

  name: 'infoCardChip',
  props:[
  	'icon','title','data_chip','subtitle'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>