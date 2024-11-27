<template>
	<div class="text-center" flat style="border: 1px solid red">
      <p class="gray-font-title">{{title}}</p>
			<p class=" number">Total: {{data1}} </p>
	</div>
</template>

<script>
export default {

  name: 'infoCardDoble',
  props: ['title','data1','name1','data2','name2','icon','data_type'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.number{
  padding: 0;
  margin: 0;
  font-size: 1.5vw;
  font-weight: bold;
  color: #2F48A3;
}
.gray-font-title{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: .92vw;
  font-weight: bold;
}
</style>