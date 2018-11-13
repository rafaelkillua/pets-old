const pkg = require('./package');

module.exports = {
    // mode: 'spa',

    /*
    ** Headers of the page
    */
    head: {
        title: "Pets Cariri",
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
    loading: {
        color: '#673AB7'
    },

    /*
    ** Global CSS
    */
    css: [
        "~assets/app.styl"
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        "~plugins/fireauth.js"
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/vuetify'
    ],

    // https://vuetifyjs.com/en/style/colors
    vuetify: {
        theme: {
            primary: "#D32F2F",
            info: "#0f5cfa",
            error: "#D50000",
            success: "#028d33",
        }
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extractCSS: true,
        extend(config, ctx) {

        }
    }
};
