<template>
	<v-card flat :height="height_card">
		<v-card-title class="justify-center">
			<v-icon
        medium
        left
        >
       {{icon}}
      </v-icon>
      <h4 class="font-weight-medium">{{title}}</h4>
		</v-card-title>
		<v-card-subtitle class="text-center"  style="margin-top:-20px;">
			<div class="subtitle-1 font-weight-medium">
      	{{subtitle}}
      </div>
		</v-card-subtitle>
		<v-card-text>
			<div  class="centrar data_list" id="list">
				<v-list :max-height="height_card-110" > 
				<v-list-item
						v-for="(item,i) in data_list"
						:key="i"
						style="margin-top:-5px;margin-bottom:-5px;margin-left:20px;"
						:id="'item-'+i"
					>
						
							<v-chip class="mx-auto" outlined color="primary" >
								<div v-if="item.option.length >= 15" style="margin-left:-5px">{{item.option}}</div>
								<div v-else>
									{{item.option}}
								</div>
							</v-chip>
							
					</v-list-item>
			</v-list>
			</div>
			<!-- <v-btn
				
					@click="scroll()"
				>
				ar
			</v-btn> -->
			


				<!-- <v-virtual-scroll
				  :height="height_card-130"
				  :items="data_list"
				  item-height="40"
				  style="overflow:hidden;"
				>
				 <template v-slot:default="{ item }">
				 	<v-list-item :id="item.option">
				 		<v-chip class="mx-auto" >
				 			{{item.option}}
				 		</v-chip>
				 	</v-list-item>
				 	<v-btn
					@click="scroll(item.option)"
				>
					arrow
				</v-btn>
				 </template>

				
				</v-virtual-scroll> 
				 -->
					
				
			<!-- </div>
				{{data_list}} -->
		</v-card-text>
	</v-card>
</template>

<style lang="css" scoped>
.centrar{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:-10px;
    overflow-x:hidden;
    overflow-y: scroll;
    scrollbar-width:thin;
}

/*.data_list*/



/*.data_list::-webkit-scrollbar {
		
}*/
</style>

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
  },
  methods:{
  	scroll(){
  		let pos_last_item = 5
  		let element = document.getElementById('list');
  		let element2 = document.getElementById('item-'+pos_last_item);
  		console.log(element2)
  		
  		element.scroll({
  			top:10
  		})
  		  		// console.log(element)
  		// console.log(element.offsetTop+10)
  	}
  }
}
</script>

<style lang="css" scoped>
</style>