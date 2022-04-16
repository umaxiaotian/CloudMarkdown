/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'EngPit CMS',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,
  plugins: [
    '@/plugins/markdown-it',
    '@/plugins/axios',
    '@/plugins/api',
    { src: '@/plugins/persistedstate.js', ssr: false}
  ],
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/vuetify',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
  },
  server: {
    port: 8080
  },
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  }
}
