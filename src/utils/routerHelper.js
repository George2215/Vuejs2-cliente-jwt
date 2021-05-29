import { getToken } from "./jwtHelper";
import * as jwt from 'jsonwebtoken';

export function guard (to, from, next) {
    if (to.meta.requiresAuth) {
        const token = getToken();
        if (token) {
            try {
                jwt.verify(token, process.env.VUE_APP_KEY_JWT)
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    return next({ name: 'Lock', query: { redirect: from.name === 'Lock' ? 'products' : 'lock' } })
                }
            }
        } else {
            return next({ name: 'Login' })
        }
    }
    next()
}