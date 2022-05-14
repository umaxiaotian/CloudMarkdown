/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
module.exports = {
  ssr: true,
  head: {
    title: 'CloudMarkdown',
    meta: [{ charset: 'utf-8' }]
  },
  env: {
    //APIの向き先
    extrafile: process.env.EXTRA_FILE_URL || 'https://cloudmarkdown-api.umaxiaotian.com',
    baseUrl: process.env.BASE_URL || 'https://cloudmarkdown-api.umaxiaotian.com'
  },
  loading: false,
  plugins: [
    '@/plugins/markdown-it',
    '@/plugins/axios',
    '@/plugins/api',
    { src: '@/plugins/persistedstate.js', ssr: false },
    { src: '@/plugins/util.js' }
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
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
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
