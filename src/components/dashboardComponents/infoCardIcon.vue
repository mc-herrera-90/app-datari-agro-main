<template>
	<v-card flat>
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
    </v-card-title>
		<v-card-text class="text-center" style="margin-top:-5px;">
      <h1 class="font-weight-light"><small>{{name}}</small></h1>
			<h1 class="font-weight-bold mt-3"><small>{{data}}</small></h1>
		</v-card-text>
	</v-card>
</template>

<script>
export default {

  name: 'infoCardIcon',
  props: ['title','data','name','icon','data_type'],

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>