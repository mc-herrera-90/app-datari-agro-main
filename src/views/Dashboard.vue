<template>
  <v-app id="dash">
    <v-app-bar app dark elevation="0" clipped-left color="blue darken-4">
      <v-app-bar-nav-icon @click.stop="menulateral = !menulateral"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-img
            alt="labict logo"
            class="shrink"
            contain
            src="@/media/logo_blanco.png"
            transition="scale-transition"
            width="120"
            height="30"
          />
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
      <span class="ml-1 mr-2">{{ user }}</span>
      <v-btn @click="logout" v-if="isLoggedIn" text>
        <v-icon>mdi-power-cycle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="menulateral"
      floating
      app
      :permanent="menulateral"
      clipped
      width="295"
      dark
      color="blue darken-3"
    >
      <v-list nav class="mt-1 d-flex flex-column" height="95%">
        <v-list-item
          class="px-0"
          link
          :to="{ path: '/' }"
          active-class="white--text blue darken-3"
        >
          <v-list-item-avatar>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <h4 class="font-weight-medium">Home</h4>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          class="px-0"
          link
          :to="{ path: '/caracterizacion/' }"
          active-class="white--text blue darken-3"
        >
          <v-list-item-avatar>
            <v-icon>mdi-file-plus-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <h4 class="font-weight-medium">Resultados Generales</h4>
          </v-list-item-content>
        </v-list-item>

        <!-- Vista para el administrador -->
        <div v-if="userRole === 'admin'">
          <v-list-item-content>
            <v-select
              label="Productor"
              :items="producers"
              item-value="id"
              item-text="nombre"
              v-model="selectedProducer"
              @change="handleProducerChange"
              outlined
            ></v-select>
          </v-list-item-content>
        </div>

        <!-- Vista para un productor específico -->
        <div v-else>
          <v-list-item
            class="px-0"
            link
            :to="{ path: `/detallesencuesta/${userId}` }"
            active-class="white--text blue darken-3"
          >
            <v-list-item-avatar>
              <v-icon>mdi-file-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <h4 class="font-weight-medium">Mis Resultados</h4>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background-color:#D5D8DC">
      <v-container fluid transition="fade-transition">
        <router-view :loading="loading"></router-view>
      </v-container>
    </v-main>
    <v-footer dark app padless>
      <span class="white--text ml-2"><small>LAB ICT &copy; {{ new Date().getFullYear() }}</small> </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Dashboard",
  data: () => ({
    producers: [
      { id: 1, nombre: "Prod 1" },
      { id: 2, nombre: "Prod 2" },
      { id: 3, nombre: "Prod 3" },
      { id: 4, nombre: "Prod 4" },
      { id: 5, nombre: "Prod 5" },
      { id: 6, nombre: "Prod 6" },
      { id: 7, nombre: "Prod 7" },
    ],
    userId: localStorage.getItem("user_id"),
    userRole: localStorage.getItem("user_role"),
    menulateral: true,
    loading: false,
    user: localStorage.getItem("username"),
    
  }),
  computed: {
    ...mapState(["selectedProducer"]),
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    ...mapActions(["updateSelectedProducer", "fetchGeneralData"]),
    handleProducerChange(producerId) {
      this.updateSelectedProducer(producerId);
      this.fetchGeneralData(producerId).then(() => {
        this.$router.push({ path: `/detallesencuesta/${producerId}` });
      });
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
#dash {
  max-height: 98vh;
  overflow: hidden;
}
.v-list-item {
  flex: 0;
}
</style>
