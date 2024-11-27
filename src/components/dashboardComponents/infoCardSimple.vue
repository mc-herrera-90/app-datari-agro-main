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
		<v-card-text class="text-center"
    style="margin-top: -17px;">
      <h3 class="font-weight-light">{{data_type}}</h3>
			<h1 class="font-weight-bold number mt-2">{{data}}</h1>
		</v-card-text>
	</v-card>
</template>

<script>
export default {

  name: 'infoCard',
  props: ['title','data','icon','data_type'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.number{
  font-size: 32px;
  color: #2F48A3;
}
</style>