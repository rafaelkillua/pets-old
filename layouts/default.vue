<template>
    <v-app>

        <TheDrawer :user="user" :rotas="rotas" :drawer="drawer" @toggleDrawer="drawer = $event"/>

        <TheToolbar :toggleDrawer="toggleDrawer" :title="title" :rotas="rotas"/>

        <v-content>
            <v-container fluid fill-height text-xs-center>
                <nuxt/>
            </v-container>
        </v-content>

        <v-snackbar
            v-model="snackbarShow"
            :color="notificacao ? notificacao.tipo : 'info'"
            :bottom="true"
            :multi-line="true"
            :timeout="5000"
            @click="snackbarShow = false"
        >
            {{notificacao ? notificacao.mensagem : "ERROUUUU"}}
        </v-snackbar>

        <TheFooter/>

    </v-app>
</template>

<script>
    import TheFooter from "~/components/TheFooter";
    import TheDrawer from "~/components/TheDrawer";
    import TheToolbar from "~/components/TheToolbar";
    import TheSnackbar from "~/components/TheSnackbar";

    export default {
        components: {TheFooter, TheDrawer, TheToolbar, TheSnackbar},

        data: () => ({
            title: "PETS CARIRI",
            drawer: false,
            snackbarShow: false
        }),

        computed: {
            user() {
                return this.$store.getters.getLoggedUser;
            },

            notificacao() {
                return this.$store.getters.getNotificacao;
            },

            mostrarNotificacao() {
                return this.$store.getters.getMostrarNotificacao;
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
            },
        },

        watch: {
            mostrarNotificacao(value) {
                if (value) this.snackbarShow = value;
            },

            snackbarShow(value) {
                if (!value) this.$store.dispatch("limparNotificacao");
            }
        }
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
