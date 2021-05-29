import Vue from 'vue'
import VuetifyConfirm from 'vuetify-confirm'
import vuetify from './vuetify'

Vue.use(VuetifyConfirm, {
    vuetify,
    buttonTrueText: 'Aceptar',
    buttonFalseText: 'Descartar',
    color: 'red',
    icon: 'mdi-warning',
    title: 'Eliminar producto',
    width: 500,
    property: '$confirm'
});
