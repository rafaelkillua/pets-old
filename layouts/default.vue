<template>
    <v-app>

        <Drawer :user="user" :rotas="rotas" :drawer="drawer" @toggleDrawer="drawer = $event"/>

        <Toolbar :toggleDrawer="toggleDrawer" :title="title" :rotas="rotas"/>

        <v-content>
            <v-container fluid fill-height text-xs-center>
                <nuxt/>
            </v-container>
        </v-content>

        <v-snackbar
            :value="sucesso != null"
            color="success"
            :bottom="true"
            :multi-line="true"
            :timeout="5000"
            @click="() => this.$store.dispatch('limparErros')"
        >
            {{sucesso ? sucesso : ""}}
        </v-snackbar>

        <v-snackbar
            :value="erro != null"
            color="error"
            :bottom="true"
            :multi-line="true"
            :timeout="5000"
            @click="() => this.$store.dispatch('limparErros')"
        >
            {{erro ? erro : ""}}
        </v-snackbar>

        <Footer/>

    </v-app>
</template>

<script>
    import Footer from "~/components/Footer";
    import Drawer from "~/components/Drawer";
    import Toolbar from "~/components/Toolbar";

    export default {
        components: {Footer, Drawer, Toolbar},

        data: () => ({
            title: "PETS CARIRI",
            drawer: false,
        }),

        computed: {
            user() {
                return this.$store.getters.getLoggedUser
            },

            erro() {
                return this.$store.getters.getErro
            },

            sucesso() {
                return this.$store.getters.getSucesso
            },

            rotas() {
                let rotas = [];
                rotas.push({nome: "Início", icone: "home", caminho: "/", drawerOnly: true});

                if (!!this.user) {
                    rotas.push(
                        {nome: "Protegido", icone: "lock", caminho: "/protegido"},
                        {nome: "Perfil", icone: "person", caminho: "/perfil"},
                        {nome: "Logout", icone: "exit_to_app", caminho: "/", dispatch: "logout"}
                    );
                } else {
                    rotas.push(
                        {nome: "Cadastrar-se", icone: "person_add", caminho: "/cadastro"},
                        {nome: "Login", icone: "person", caminho: "/login"}
                    );
                }
                return rotas;
            }
        },

        methods: {
            toggleDrawer(value) {
                this.drawer = value
            }
        },
    }
</script>

<style>

    @import url('https://fonts.googleapis.com/css?family=Krub');

    html {
        font-family: 'Krub', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
    }

    a, a:link {
        text-decoration: none;
        color: white;
    }
</style>
