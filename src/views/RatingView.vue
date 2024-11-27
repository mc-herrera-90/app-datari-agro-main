<template>
    <div id="RatingView">
      <div id="header">
      <v-app-bar color="blue darken-2" class="rounded" flat dark>
        <div>
          <h2 class="font-weight-light mr-4 mb-0">ENCUESTA AGRO 2024</h2>
        </div>
        <div class="ml-6">
          <v-slide-group v-model="activeTab">
          <v-slide-item
            v-for="(item, index) in tabs"
            :key="index"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="index === activeTab ? 'blue lighten-5 black--text' : 'blue darken-1 white--text'"
              class="ma-2"
              height="40"
              width="200"
              dense
              solo-inverted
              @click="navigateTo(index)"
            >
              <v-row align="center" justify="center">
                <div class="mt-5">
                  <h4 class="font-weight-medium">{{ item.label }}</h4>
                </div>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        </div>
        <v-spacer/>
      </v-app-bar>

    </div>
        <v-card class="px-3 py-3 mt-3" id="body-raiting">
                <p class="gray-font-title">Rating</p>
                <p class="gray-font-subtitle">Productores</p>
                <span class="gray-font-text">Buenas Prácticas Sostenibilidad Agrícola</span>
                <div class="text-center">
                  <div class="image-container">
                  </div>
                <p class="gray-font-text-italic">
                  BPSA: Buenas Prácticas Sostenibilidad Agrícola
                </p>
              </div>
          </v-card>
    </div>
  </template>
  
  <script>
  
    export default {
    name: 'RatingView',
    data() {
      return {
        activeTab: 1,
        tabs: [
          { label: 'Caracterización', path: '/caracterizacion/' },
          { label: 'Rating', path: '/rating/' },
          { label: 'Materia Prima', path: '/materiaprima/' },
        ],
      };
    },
    components: {
    },
      methods:{
        navigateTo(index) {
        this.activeTab = index;
        this.$router.push({ path: this.tabs[index].path });
      },
      },
      created(){
      }
    }
  </script>
  
  <style scoped>

  #RatingView {
    height: 84vh;
    overflow: hidden;
  }

  #body-raiting {
    height: 100%;
  }
  .v-btn.white--text {
    background-color: white;
    color: black !important;
  }
  .image-container {
    height: 49vh;
    background-image: url('../media/raiting_E-adjust.png');
    background-position: center;
    background-size: contain;
  }
  .img {
    height: 100%;
    width: 60%;
  }
  .gray-font-title{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: 1.8vw;
  font-weight: bold;
}
.gray-font-subtitle{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: 1.5vw;
  font-weight: normal;
}
.gray-font-text{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: 20px;
  font-weight: normal;
}

.gray-font-text-italic{
  padding: 0;
  margin: 0;
  color: #7F7F7F;
  font-size: 20px;
  font-style: italic;
  font-weight: normal;
}
  </style>