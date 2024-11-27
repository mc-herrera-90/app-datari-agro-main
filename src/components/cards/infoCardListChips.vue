<template>
  <div id="infoCardListChipsSelect">
    {{data_list}}
  </div>
</template>

<script>
export default {

  name: 'infoCardListChips',
  props: [
    'data_list','title','subtitle','icon',
    'height_card','height_chart'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>

</style>