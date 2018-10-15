const pkg = require('./package')

module.exports = {
    mode: 'spa',

    /*
    ** Headers of the page
    */
    head: {
        title: "Pets",
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},

    /*
    ** Global CSS
    */
    css: ["~assets/app.styl"],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: ["~plugins/vuetify.js"],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        '@nuxtjs/vuetify'
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    vuetify: {},

    /*
    ** Build configuration
    */
    build: {
        vendor: ["axios", "vuetify"],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
};
