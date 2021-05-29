<template>
<v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
        <v-card-title class="headline justify-center">Sesión a punto de expirar</v-card-title>
        <v-card-text class="text-center">
        Refresca el token para continuar identificado en la aplicación
        <p v-html="timeComputed"></p>
        </v-card-text>
        <v-card-actions class="text-center">
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="refresh">Seguir en la aplicación</v-btn>
        <v-btn color="green darken-1" text @click="logout">Cerrar sesión</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</v-row>
</template>

<script>
import {refreshToken} from "../utils/jwtHelper";
import checkJwtExpiration from "../mixins/checkJwtExpiration";
export default {
    name: 'ModalRefreshJwt',
    mixins: [checkJwtExpiration],
    data () {
        return {
            dialog: false,
            time: 0,
            interval: null
        }
    },
    computed: {
        timeComputed () {
            return `Quedan <b>${this.time} segundos</b> para que la sesión expire`
        }
    },
    methods: {
        async refresh () {
            await refreshToken();
            clearInterval(this.interval);
            this.dialog = false;
        },
        logout () {
            clearInterval(this.interval);
            this.$jwtEvents.$emit('logout');
            this.dialog = false;
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>
