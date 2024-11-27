<template>
	<div class="text-center">
		<p class="gray-font-title">{{title}}</p>
		<p class="gray-font-subtitle">{{name1}} : <span class="number">{{data1}}</span></p>
		<p class="gray-font-subtitle">{{name2}} : <span class="number">{{data2}}</span></p>
		<p class="gray-font-subtitle">{{name3}} : <span class="number">{{data3}}</span></p>
	</div>
</template>

<script>
export default {

  name: 'infoCardTriple',
  props: ['title','data1','name1','data2','name2','data3','name3','icon','data_type'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.number{
  padding: 0;
  margin: 0;
  font-size: 1vw;
  font-weight: bold;
  color: #2F48A3;
}
.gray-font-title{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: .8vw;
  font-weight: bold;
}
.gray-font-subtitle{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: .9vw;
  font-weight: normal;
}
</style>