 <template>
 <v-app id="login" >
  <v-main style="background-color:#D5D8DC" >
    <v-container  fill-height >
      <v-layout align-center justify-center>
        <v-flex style="max-width:400px" class='text-center display-1 mb-3'  >
          <v-card dark color="white" elevation="6" height=430>
            <v-card-text class="subheading">
              <v-img
                  class = 'mx-auto mt-8'
                  max-height="50"
                  max-width="220"
                  src="@/media/logo_azul.png"
                  transition="fade"
              ></v-img>
              
              <div style="width:90%; margin: 0 auto;">
                <v-form @submit.prevent="login"  ref='form' class="mt-12">
                  <v-text-field  v-model='username' light prepend-icon='mdi-account' label='Usuario' type='text'  :rules="[v => !!v || 'Ingrese un nombre de usuario'] " >
                  </v-text-field>
                  <v-text-field  v-model='password' class="mt-4"  light prepend-icon='mdi-lock' label='Contraseña' type='password' :rules="[v => !!v || 'Ingrese una contraseña'] ">
                  </v-text-field>
      

                <!--  <div v-if="error_active">
                  <v-alert type="error" :value="error_active" class="text-left" transition="fade-transition">
                    Cuenta desactivada. El tiempo de prueba ha expirado.
                  </v-alert>
                </div> -->
                <div  style="margin-top:20px;">
                  <div v-if="loading">
                    <v-progress-circular
                      :size="40"
                      color="blue"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                  <div v-else>
                    <v-btn color="#1565C0" block dark type='submit'  transition="fade-transition">
                      Iniciar Sesión
                    </v-btn>
                  </div>
                </div>
                 <div id="alertas" class="mt-4">
                  <div v-if="login_succesful">
                    <v-alert type="success" :value="login_succesful" class="text-left" transition="fade-transition" dense>
                     Credenciales Validas
                    </v-alert>
                  </div>
                  <div v-if="error_credenciales">
                  <v-alert type="error" :value="error_credenciales" class="text-left" transition="fade-transition" dense>
                    Credenciales incorrectasa
                  </v-alert>
                 </div>
                </div>
                </v-form>

              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
 </v-app>
 </template>

 <script>

export default {
  name: 'Login',
  data(){
    return {
      username: null,
      password: null,
      login_succesful: false,
      loading:false,
      error_credenciales:false,
      options: {
      shouldStayLoggedIn: true,
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate();
      if(this.username != null &&  this.password != null){
        this.error_credenciales=false;
        this.loading = true;
        let username = this.username;
        let password = this.password;
        this.$refs.form.validate();
        this.$store.dispatch('login', {username, password})
        .then( () => {
          this.error_credenciales=false;
          this.sleep(3000).then(() => {
            this.loading = false;
            this.login_succesful = true;
            this.sleep(2000).then(() =>{
              this.$router.push({path: '/'});
            });

          });
        })
        .catch(err => {
          this.error_credenciales=true;
          this.login_succesful = false;
          this.loading = false;

          
        })
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
}
 </script>
