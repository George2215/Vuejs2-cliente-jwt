import Vue from 'vue'
import VueRouter from 'vue-router'
import {guard} from "../utils/routerHelper";

import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import LockPage from '../views/LockPage'
import ProductListPage from '../views/Products/ProductListPage'
import ProductDetailPage from '../views/Products/ProductDetailPage'
import ProductNewPage from '../views/Products/ProductNewPage'
import ProductEditPage from '../views/Products/ProductEditPage'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/lock',
    name: 'Lock',
    component: LockPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/products',
    name: 'ProductsList',
    component: ProductListPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products/:id/detail',
    name: 'ProductsDetail',
    component: ProductDetailPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products/create',
    name: 'ProductsNew',
    component: ProductNewPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductsEdit',
    component: ProductEditPage,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  return guard(to, from, next)
});

export default router
