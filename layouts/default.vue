<template>
    <v-app>

        <v-navigation-drawer
            app
            v-model="drawer"
            absolute
            temporary
        >
            <v-list class="pa-1">
                <v-list-tile avatar v-if="isAuthenticated">
                    <v-list-tile-avatar>
                        <img src="../assets/placeholder_auth.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{getLoggedUser.email}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar v-else-if="!isAuthenticated">
                    <v-list-tile-avatar>
                        <img src="../assets/placeholder.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Cadastre-se ou faça login</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>

                <v-divider></v-divider>

                <v-list-tile
                    v-for="rota in rotas"
                    v-if="rota.needAuth === isAuthenticated"
                    :key="rota.nome"
                    @click="$router.push(rota.caminho)"
                >
                    <v-list-tile-action>
                        <v-icon>{{rota.icone}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ rota.nome }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile
                    v-if="isAuthenticated"
                    @click="logout"
                >
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app dark color="primary">

            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

            <v-toolbar-title dark>
                <nuxt-link to="/" class="white--text">
                    PETS CARIRI
                </nuxt-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat
                       v-for="rota in rotas"
                       :to="rota.caminho"
                       v-if="rota.needAuth === isAuthenticated"
                       :key="rota.nome"
                >
                    <v-icon left>{{rota.icone}}</v-icon>
                    {{rota.nome}}
                </v-btn>
                <v-btn flat
                       v-if="isAuthenticated"
                       @click="logout"
                >
                    <v-icon left>exit_to_app</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <v-content>
            <v-container fluid fill-height>
                <nuxt/>
            </v-container>
        </v-content>

        <v-footer app color="primary">
            <v-container fill-height>
                <v-layout align-center justify-end>
                    <p class="white--text"> &copy;2018 -
                        <a href="https://rafaelst.com.br" target="_blank" class="white--text">
                            <strong>Rafael Sampaio Tavares</strong>
                        </a>
                    </p>
                </v-layout>
            </v-container>
        </v-footer>

    </v-app>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data: () => ({
            drawer: false,
            rotas: [
                {nome: "Cadastrar-se", icone: "person_add", caminho: "/cadastro", needAuth: false},
                {nome: "Login", icone: "person", caminho: "/login", needAuth: false},
                {nome: "Cadastrar Pet", icone: "pets", caminho: "/cadastrarPet", needAuth: true},
            ]
        }),

        methods: {
            logout() {
                this.$store.dispatch("logout");
                this.$router.push("/");
            }
        },

        computed: {
            ...mapGetters([
                "isAuthenticated",
                "getLoggedUser"
            ])
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
