<template>
	<v-app id="index" >
  	<v-main style="background-color:#1565C0" >
  		<v-container  fill-height >
      	<v-layout align-center justify-center>
        	<div>
	        	<div>
	        		<v-img
	              max-height="50"
	              max-width="220"
	              src="@/media/logo_blanco.png"
	              transition="fade"
	             ></v-img>
	           	</div>
	           	<div
	           		class="mt-8 mb-14 text-center"

	           	>
             	<v-progress-circular
				        :size="60"
				        color="white"
				        indeterminate
				      ></v-progress-circular>
	            </div>
	            <div class="mt-4 ml-16">
	            	<v-row>
	            		<v-col cols=4>
	            			 <v-img
					            max-height="80"
					            max-width="25"
					            src="@/media/logo_lab.png"
					            transition="fade"
					            ></v-img>
	            		</v-col>
	            		<v-col cols=8>
	            			<h3 class="white--text font-weight-medium mt-0" style="margin-left:-35px;">
	            			LAB-ICT 
	            			</h3>
	            		</v-col>
	            	</v-row>
	            </div>
          	</div>
        	</v-layout>
      	</v-container>
  		</v-main>
  		 <v-footer dark app  style="background-color:#1565C0" class="justify-center">
  		 	<div>
  		 		{{ new Date().getFullYear() }} — <strong>LABICT &copy;</strong>
  		 	</div>
  		 	
	            		
	            			
	            		
  		 </v-footer>
		</v-app>
</template>

<script>
export default {

  name: 'indexView',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>

</style>