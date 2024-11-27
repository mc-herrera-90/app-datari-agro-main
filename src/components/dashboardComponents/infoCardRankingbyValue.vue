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
      <h2 class="font-weight-light mt-1">{{subtitle}}</h2>
    </v-card-subtitle>
		<v-card-text class="mt-1" >
			<span v-if="data_list[0].hasOwnProperty('option')" class="text-left font-weight-medium ml-0">Deficiente</span>
			<div class="mt-1 mb-1">
			<template v-for="dato in data_list">
				<div style="margin-top:-15px;margin-bottom:-10px;">
					<div v-if="dato.hasOwnProperty('option')">
						<v-row>
							<v-col cols=4>
								<h3 class="font-weight-medium text-center ">
									{{dato.option}}
								</h3>
							</v-col>
							<v-col cols=8>
								<v-progress-linear
				        	:value="dato.porcentaje"
				       		height="25"
				       		

				      	>
				        	<strong>{{ (dato.porcentaje).toFixed(2)}}%</strong>
		      			</v-progress-linear>
							</v-col>
						</v-row>
					</div>
					<div v-if="dato.hasOwnProperty('region')">
						<v-row>
							<v-col cols=6>
							 <h4 class="font-weight-medium">
								{{dato.region}}
								</h4>
							</v-col>
							<v-col cols=6>
								<v-progress-linear
			        		:value="dato.porcentaje"
			       			height="20"
			       			color="orange lighten-1"
			      		>
			        		<strong>{{ (dato.porcentaje).toFixed(2) }}%</strong>
	      				</v-progress-linear>
	      			</v-col>
	      		</v-row>
					</div>
				</div>
			</template>
			</div>
			<span v-if="data_list[0].hasOwnProperty('option')" class="text-left font-weight-medium ml-0">Muy buena</span>

      <!-- <h2 class="font-weight-light"><small>{{name}}</small></h2>
			<h1 class="font-weight-bold mt-3"><small>{{data}}</small></h1> -->
		</v-card-text>
	</v-card>
</template>

<script>
export default {

  name: 'infoCardRankingbyValue',
  props:[
  	'icon',
  	'title',
  	'subtitle',
  	'data_list',
  	'height'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>