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
    <v-card-subtitle class="text-center">
      <h3 class="font-weight-medium ">{{subtitle}}</h3>
    </v-card-subtitle>
		<v-card-text class="text-center" style="margin-top:-15px;">
      <h2 class="font-weight-light"><small>{{name}}</small></h2>
			<h1 class="font-weight-BOLD mt-3"><small>{{data}}</small></h1>
		</v-card-text>
	</v-card>
</template>

<script>
export default {

  name: 'infoCard',
  props: ['title','subtitle','data','name','icon','data_type','height'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>