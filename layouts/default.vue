<template>
    <v-app>

        <v-navigation-drawer
            app
            v-model="drawer"
            absolute
            temporary
        >
            <v-list class="pa-1">
                <v-list-tile avatar v-if="user">
                    <v-list-tile-avatar>
                        <img :src="user.photoURL">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{user.email}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar v-else-if="!user">
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
                       :key="rota.nome"
                >
                    <v-icon left>{{rota.icone}}</v-icon>
                    {{rota.nome}}
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <v-content>
            <v-container fluid fill-height text-xs-center>
                <nuxt/>
            </v-container>
        </v-content>

        <Footer/>

    </v-app>
</template>

<script>
    import Footer from "~/components/Footer";

    export default {
        components: {Footer},

        data: () => ({
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
                let rotas = [
                    {nome: "Cadastrar-se", icone: "person_add", caminho: "/cadastro"},
                    {nome: "Login", icone: "person", caminho: "/login"},
                ];
                if (!!this.user) rotas = [
                    {nome: "Cadastrar Pet", icone: "pets", caminho: "/cadastrarPet"},
                    {nome: "Logout", icone: "exit_to_app", caminho: "/logout"}
                ];
                return rotas;
            }
        },
        watch: {
            user() {
                console.log("[layout default] User changed");
                this.$router.push("/");
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
