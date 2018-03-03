module.exports = {
  /*
  ** Headers of the page
  */

  head: {
    title: 'makertap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Marketplace of adspace' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: '/css/uikit.min.css' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: '/css/custom.css' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: 'https://fonts.googleapis.com/css?family=Open+Sans|Lato|Roboto|Encode+Sans|Montserrat' },
      { rel: 'stylesheet', type: 'text/css', media: 'screen', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],

    script: [
      { src: '/js/uikit.min.js' },
      { type: 'text/javascript', src: 'https://js.taplytics.com/jssdk/d5a79ba37bd047b38b0dc3befa5732c6.min.js' },
    ]
  },
  // serverMiddleware: [
  //   '~/server/socket',
  //   { path: '/api', handler: '~/server/api.js' }
  // ],
  plugins: [
    { src: '~/plugins/firebase', ssr: false },
    { src: '~/plugins/socketio', ssr: false },
    { src: '~/plugins/uikit', ssr: false },
    { src: '~/plugins/quillEditor', ssr: false }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#187feb' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-ravepayment', 'uikit'],
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
    '@nuxtjs/auth'
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
    WS_URL: 'http://localhost:3000/'
  },
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
