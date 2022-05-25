/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
import colors from 'vuetify/lib/util/colors'
module.exports = {
  ssr: false,
  target: 'static',
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
    { src:  '@/plugins/markdown-it',ssr: false },
    { src:  '@/plugins/axios',ssr: false },
    { src:  '@/plugins/api',ssr: false },
    { src: '@/plugins/persistedstate.js', ssr: false },
    { src: '@/plugins/util.js' , ssr: false}
  ],
  buildModules: [
    { src: '@nuxt/typescript-build',ssr: false },
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
      dark: true,
      themes: {
        dark: {
          primary: colors.blue,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
}
