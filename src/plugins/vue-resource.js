import Vue from 'vue'
import VueResource from 'vue-resource'
import { setToken } from '../utils/jwtHelper'
import { authenticationModes } from '../main'
Vue.use(VueResource);

Vue.http.options.root = process.env.VUE_APP_API_URL;
Vue.http.interceptors.push(function (request, next) {
    request.headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    request.headers.set('Accept', 'application/json');

    next((response) => {
        if (authenticationModes.refreshTokenFromAuthorizationHeaderResponse) {
            let header;
            for (header in response.headers.map) {
                if (header === 'authorization') {
                    const bearer = response.headers.map[header][0];
                    const split = bearer.split(' ');
                    const token = split[1];
                    setToken(token);
                    // eslint-disable-next-line no-console
                    console.log('token updated!', token)
                }
            }
        }
    })
});