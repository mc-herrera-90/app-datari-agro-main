<template>
	<v-card>
		<v-card-title >
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
      <h4 class="font-weight-medium">{{title}}</h4>
		</v-card-title>
    <v-card-subtitle>
      <h3 class="font-weight-light">Calidad</h3>
    </v-card-subtitle>
		<v-card-text  style="margin-top:-20px;" >
			<div class=" mt-2">
        <v-rating v-model="data_rating"
          readonly
        >
          <template v-slot:item="props">
            <v-icon
              :color="props.index+1 === data_rating ? genColor(props.index) : 'grey lighten-1'"
              large
            >
              {{  props.index+1 === data_rating ?  'mdi-numeric-'+(props.index+1)+'-circle' : 'mdi-numeric-'+(props.index+1)+'-circle-outline' }}
            </v-icon>
          </template>
        </v-rating>
			</div>
			<h3 class="font-weight-light mt-1 ">Comentario</h3>
			<h2 class="font-weight-bold mt-1"><small>{{data_comentario !== '' ? data_comentario : 'S/I'}}</small></h2>
		</v-card-text>
	</v-card>
</template>

<script>
export default {

  name: 'infoCardRating',
  props: ['title','data_rating','data_comentario','icon','data_type','height'],
  data () {
    return {

    }
  },
  methods:{
    genColor (i) {
      return 'red'
    },
  }
}
</script>

<style lang="css" scoped>
</style>