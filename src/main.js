import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './i18n'

import {
  refreshToken,
  checkJwtExpired,
  dialogBeforeJwtExpires,
  consoleLogForExpirationToken
} from './utils/jwtHelper'

Vue.config.productionTip = false

Vue.prototype.$jwtEvents = new Vue()

export const authenticationModes = {
  autoRefreshToken: false, // auto refresh token before token expires automatically (nunca caduca la sesión)
  lockPageIfTokenExpired: false, // muestra una página de bloqueo si el token expira, no se refresca sólo
  dialogBeforeJwtExpires: false, // muestra una ventana modal antes de que el token expire para actualizar la sesión
  refreshTokenFromAuthorizationHeaderResponse: true // refresca el token automáticamente utilizando la respuesta de las cabeceras del servidor
};

// muestra un console.log cada segundo para saber cuánto falta para que expire el JWT
setInterval(() => {
  consoleLogForExpirationToken()
}, 1000);

// aplicamos el sistema autoRefreshToken
if (authenticationModes.autoRefreshToken) {
  refreshToken().then(() => {});
  // refresh the token each ttl - 10 (50 seconds)
  setInterval(async () => {
    await refreshToken()
  }, 50000)
}

// comprueba si el token ha expirado, y si es así, redirige a la página de lock
if (
  authenticationModes.lockPageIfTokenExpired ||
  authenticationModes.refreshTokenFromAuthorizationHeaderResponse
) {
  // check if token is expired each 30 seconds
  setInterval(() => {
    checkJwtExpired()
  }, 30000)
}

// muestra una ventana modal unos segundos antes de que el token haya expirado
if (authenticationModes.dialogBeforeJwtExpires) {
  // check each 10 seconds if token is near to expires
  setInterval(() => {
    dialogBeforeJwtExpires()
  }, 10000)
}

new Vue({
  router,
  vuetify,
  i18n,
  data () {
    return {
      authenticationModes
    }
  },
  render: h => h(App)
}).$mount('#app')
