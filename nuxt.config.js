require('dotenv').config()
module.exports = {
  /*
  ** Headers of the page
  */

  head: {
    title: 'Makertap - Promote your product through influential twitter accounts.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'keywords', content: 'Makertap,promote,marketing,promote my business, micro-influencer, influencer, influencer makerting, twitter influencer' },
      { name: 'author', content: 'Kolawole Alade' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: '/css/uikit.min.css' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: '/css/custom.css' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: 'https://fonts.googleapis.com/css?family=Open+Sans|Lato|Roboto|Encode+Sans|Montserrat|Rubik:300,400' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    script: [
      { src: '/js/uikit.min.js' },
      { src: '/js/uikit-icons.min.js', async: true }
    ]
  },
  plugins: [
    { src: '~/plugins/firebase', ssr: false },
    { src: '~/plugins/date' },
    { src: '~/plugins/numberAbbreviate' },
    { src: '~/plugins/socketio', ssr: false },
    // { src: '~/plugins/uikit', ssr: false },
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#187feb' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['uikit'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/google-analytics', {
      id: 'UA-112689990-1'
    }]
  ],
  auth: {
    endpoints: {
      login: {
        url: '/api/auth/login',
        propertyName: 'token.accessToken'
      },
      user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
    },
    redirect: {
      login: '/login',
      home: '/'
    },
    token: {
      type: 'Bearer',
      name: 'token',
    },
    cookie: {
      name: 'mtoken',
      options: {
        path: '/',
        expires: 10
      }
    }
  },
  env: {
    WS_URL: (function () {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000'
      }
      if (process.env.NODE_ENV === 'production') {
        return 'https://makertap.com'
      }
      if (process.env.NODE_ENV === 'staging') {
        return 'https://makertap.now.sh'
      }
    })(),
    RAVEPAY_PUBLIC_KEY: process.env.RAVEPAY_PUBLIC_KEY
  },
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': (function () {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000'
      }
      if (process.env.NODE_ENV === 'production') {
        return { target: 'https://makertap.com' }
      }
      if (process.env.NODE_ENV === 'staging') {
        return 'https://makertap.now.sh'
      }
    })()
  }
}
