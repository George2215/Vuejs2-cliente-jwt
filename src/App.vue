<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title class="headline text-uppercase">
        <span>JWT Laravel 8 y Vuejs 2</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text @click="logout" v-if="logged">
        Cerrar Sesion
      </v-btn>
    </v-app-bar>

    <v-main>
      <modal-refresh-jwt v-if="$root.$data.authenticationModes.dialogBeforeJwtExpires"/>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { isLogged, setToken } from './utils/jwtHelper'
import ModalRefreshJwt from "./components/ModalRefreshJwt";
export default {
  name: 'App',
  components: { ModalRefreshJwt },
  async mounted () {
    this.$jwtEvents.$on('tokenExpired', () => {
      this.logged = false;
    });
    this.$jwtEvents.$on('login', () => {
      this.logged = true;
    });
    this.$jwtEvents.$on('logout', async () => {
      await this.logout();
    })
  },
  data () {
    return {
      logged: isLogged()
    }
  },
  methods: {
    async logout () {
      setToken(null);
      this.logged = false;
      await this.$router.replace({ name: 'Login' });
    }
  }
};
</script>
