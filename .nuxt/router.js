import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2abdaec7 = () => interopDefault(import('..\\pages\\article.vue' /* webpackChunkName: "pages/article" */))
const _5b6199fa = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5143bee7 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _3ccd6a98 = () => interopDefault(import('..\\pages\\tags.vue' /* webpackChunkName: "pages/tags" */))
const _7f1d1492 = () => interopDefault(import('..\\pages\\user\\editor.vue' /* webpackChunkName: "pages/user/editor" */))
const _dc8c123a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/article",
    component: _2abdaec7,
    name: "article"
  }, {
    path: "/login",
    component: _5b6199fa,
    name: "login"
  }, {
    path: "/search",
    component: _5143bee7,
    name: "search"
  }, {
    path: "/tags",
    component: _3ccd6a98,
    name: "tags"
  }, {
    path: "/user/editor",
    component: _7f1d1492,
    name: "user-editor"
  }, {
    path: "/",
    component: _dc8c123a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
