<template>
	<div>
		<v-card flat>
			<v-card-title class="justify-center">
				<v-icon
        medium
        left
        >
	       {{icon}}
	      </v-icon>
				<h4 class="font-weight-medium">
					{{title}}
				</h4>
			</v-card-title>
			<v-card-subtitle class="text-center">
				<h3 class="font-weight-medium mt-0">
					{{subtitle}}
				</h3>
			</v-card-subtitle>
			<v-card-text class="text-center mt-1">
				<div>
					<v-row>
						<v-col cols=2>
							<h3 class="font-weight-medium">
								{{data_1.option}}
							</h3>
						</v-col>
						<v-col>
							<v-progress-linear
			        	v-model="data_1.porcentaje"
			       		height="20"
			      	>
			        	<strong>{{ data_1.porcentaje }}%</strong>
	      			</v-progress-linear>
						</v-col>
					</v-row>
				</div>
	      <div >
					<v-row>
						<v-col cols=2>
							<h3 class="font-weight-medium">
								{{data_2.option}}
							</h3>
						</v-col>
						<v-col>
							<v-progress-linear
			        	v-model="data_2.porcentaje"
			       		height="20"
			      	>
			        	<strong>{{ data_2.porcentaje }}%</strong>
	      			</v-progress-linear>
						</v-col>
					</v-row>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {

  name: 'infoCardSimpleRanking',
  props:[
  	'title','icon','subtitle','data_1','data_2'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>