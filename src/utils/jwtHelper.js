import Vue from 'vue'
import VueJwtDecode from 'vue-jwt-decode'
import * as jwt from 'jsonwebtoken'
import router from '../router'

/**Permite Obtener un Token */
export function getToken(){
    return window.localStorage.getItem('token')
}

export function setToken(token){
    if(!token){
        window.localStorage.removeItem('token')
    }else{
        if(typeof token === 'string'){
            window.localStorage.setItem('token', token)
        }else{
            window.localStorage.setItem('token', token['access_token'])
        }
    }
}

/**Valida si el Usuario esta autenticado */
export function isLogged () {
    const token = getToken();
    if (token) {
        try {
            jwt.verify(token, process.env.VUE_APP_KEY_JWT);
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

/**Permite Obtener el Usuario */
export function getUser () {
    const logged = isLogged();
    const token = getToken();
    if (logged) {
        return VueJwtDecode.decode(token)
    }
        return null;
}

/**Permite Obtener el Email */
export function getEmail () {
    const token = getToken();
    if (token) {
        try {
            return VueJwtDecode.decode(token).email
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('ERROR', e.message)
        }
    }
}

/**Valida si el Token ha expirado */
export function checkJwtExpired () {
    const token = window.localStorage.getItem('token')

    if (token) {
        try {
            jwt.verify(token, process.env.VUE_APP_KEY_JWT)
            // eslint-disable-next-line no-console
            console.log('logged!')
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Not logged: %j', e)
            if (e.name === 'TokenExpiredError') {
                if (router.history.current.name !== 'Lock') {
                    Vue.prototype.$jwtEvents.$emit('tokenExpired')
                    router.replace({ name: 'Lock', query: { redirect: router.history.current.path } })
                }
            }
        }
    } else {
        const guestRoutes = ['Login', 'Register']
        if (!guestRoutes.includes(router.history.current.name)) {
        Vue.prototype.$jwtEvents.$emit('tokenExpired')
        router.replace({ name: 'Login' })
        }
    }
}

/**Permite renovar el Token */
export async function refreshToken () {
    try {
        const token = window.localStorage.getItem('token')
        if (token) {
            try {
                jwt.verify(token, process.env.VUE_APP_KEY_JWT)
                const { body } = await Vue.http.post('auth/refresh')
                setToken(body)
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e)
            }
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
    }
}

/**Muestra Modal avisando que el Token esta por expirar */
export function dialogBeforeJwtExpires () {
    const user = getUser()
    if (user) {
        const exp = user.exp * 1000
        const now = Date.now()
        const diff = (exp - now) / 1000
        if (diff > 0) {
            // eslint-disable-next-line no-console
            console.log('Seconds to expire:', diff)
            if (diff < 20) {
                Vue.prototype.$jwtEvents.$emit('tokenExpiring', diff)
            }
        }
    } else {
        const token = getToken()
        if (token) {
            if (router.history.current.name !== 'Lock') {
                Vue.prototype.$jwtEvents.$emit('tokenExpired')
                router.replace({ name: 'Lock', query: { redirect: router.history.current.path } })
            }
        }
    }
    // eslint-disable-next-line no-console
    console.log('lockPageIfTokenExpired')
}

/**Ver el conteo regresivo(Console.log) */
export function consoleLogForExpirationToken () {
    const user = getUser()
    if (user) {
        const exp = user.exp * 1000
        const now = Date.now()
        const diff = (exp - now) / 1000
        if (diff > 0) {
            // eslint-disable-next-line no-console
            console.log('Seconds to expire:', Math.floor(diff))
        }
    }
}