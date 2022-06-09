export default {
  loading: false,
  env: {
    appName: process.env.APP_NAME,
    appUrl: process.env.APP_URL,
    uploadEndpoint: process.env.BACKEND_URL + '/api/upload',
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: process.env.APP_PORT,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/style.pcss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/helper', ssr: false },
    { src: '@/plugins/config', ssr: false },
    { src: '@/plugins/apollo-client', ssr: false },
    { src: '@/plugins/vue-tailwind', ssr: false },
    { src: '@/plugins/vue-month-picker', ssr: false },
    { src: '@/plugins/vue-good-table', ssr: false },
    { src: '@/plugins/vue-select', ssr: false },
    { src: '@/plugins/vue-mq', ssr: false },
    { src: '@/plugins/overlayscrollbars-vue', ssr: false },
    { src: '@/plugins/vue-lazyload', ssr: false },
    { src: '@/plugins/vue-json-excel', ssr: false },
    { src: '@/plugins/vue-tooltip', ssr: false },
    { src: '@/plugins/vuex-persist.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '@/components/',
    '@/components/ui',
    {
      path: '@/components/nboard/',
      prefix: 'n',
    },
    {
      path: '@/components/nboard/ui',
      prefix: 'n',
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://vite.nuxtjs.org/
    // 'nuxt-vite',
    // https://www.npmjs.com/package/nuxt-compress
    'nuxt-compress',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://www.npmjs.com/package/vue-toastification
    'vue-toastification/nuxt',
    // https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/portal-vue
    'portal-vue/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BACKEND_URL + '/api',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vite Configuration
  vite: {
    build: false,
    experimentWarning: false,
    vue: {
      /* options for vite-plugin-vue2 */
    },
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: [],
      },
    },
    // optimizeDeps: {
    //   exclude: ['vue-demi'],
    // },
    // resolve: {
    //   alias: {
    //     '@vue/composition-api':
    //       '@vue/composition-api/dist/vue-composition-api.mjs',
    //     '@vue/composition-api/dist/vue-composition-api.esm.js':
    //       '@vue/composition-api/dist/vue-composition-api.mjs',
    //   },
    // },
  },

  // https://www.npmjs.com/package/vue-toastification#api
  toast: {
    cssFile: '@/assets/css/_vue-toastification.pcss',
    transition: 'Vue-Toastification__bounce',
    maxToasts: 5,
    newestOnTop: true,
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  },

  // https://github.com/nuxt-community/apollo-module
  apollo: {
    // Sets up the apollo client endpoints
    clientConfigs: {
      // recommended: use a file to declare the client configuration (see below for example)
      default: {
        httpEndpoint: process.env.BACKEND_URL + '/graphql',
        httpLinkOptions: {
          headers: {
            // ISC: 'bypass',
          },
        },
        /*
         * For permanent authentication provide `getAuth` function.
         * The string returned will be used in all requests as authorization header
         */
        // getAuth: () => '',
      },
    },
    // Sets the authentication type for any authorized request.
    authenticationType: 'Bearer',
    // Token name for the cookie which will be set in case of authentication
    tokenName: process.env.APOLLO_TOKEN_NAME,

    // Cookie parameters used to store authentication token
    cookieAttributes: {
      /**
       * Define when the cookie will be removed. Value can be a Number
       * which will be interpreted as days from time of creation or a
       * Date instance. If omitted, the cookie becomes a session cookie.
       */
      expires: 1,

      /**
       * Define the path where the cookie is available. Defaults to '/'
       */
      path: '/',

      /**
       * Define the domain where the cookie is available. Defaults to
       * the domain of the page where the cookie was created.
       */
      // domain: 'example.com',

      /**
       * A Boolean indicating if the cookie transmission requires a
       * secure protocol (https). Defaults to false.
       */
      secure: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@vue/apollo-composable'],
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        // 'postcss-import': {},
        'postcss-url': false,
        'postcss-simple-vars': {},
        // 'postcss-at-rules-variables': {},
        // 'postcss-each': {},
        // 'postcss-mixins': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        'postcss-responsive-type': false,
        // 'postcss-hexrgba': false,
      },
      preset: {
        // Change the postcss-preset-env settings
        features: { 'nesting-rules': false },
      },
      autoprefixer: {
        grid: false,
      },
    },
    loaders: {
      vue: {
        prettify: false,
      },
    },
    extend(config, { isDev, isClient }) {
      config.module.rules.push({
        test: /encoderWorker\.min\.js$/,
        use: [{ loader: 'file-loader' }],
      })
      config.resolve.alias['@vue/composition-api'] =
        '@vue/composition-api/dist/vue-composition-api.mjs'
      config.resolve.alias[
        '@vue/composition-api/dist/vue-composition-api.esm.js'
      ] = '@vue/composition-api/dist/vue-composition-api.mjs'
    },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/,
    },
  },
}
