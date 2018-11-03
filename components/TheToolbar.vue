<template>
    <v-toolbar app dark color="primary">

        <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
        <!--class="hidden-md-and-up"-->

        <v-toolbar-title dark ripple>
            <v-btn to="/" depressed flat active-class="default-class" large class="white--text">
                <!--<nuxt-link to="/" class="white&#45;&#45;text">-->
                {{ title }}
                <!--</nuxt-link>-->
            </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat
                   v-for="rota in rotasToolbar"
                   :to="rota.dispatch || rota.caminho"
                   nuxt
                   :key="rota.nome"
                   @click="rota.dispatch ? $store.dispatch(rota.dispatch) : false"
            >
                <v-icon left>{{rota.icone}}</v-icon>
                {{rota.nome}}
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>
    export default {
        props: ["title", "rotas", "toggleDrawer"],

        computed: {
            rotasToolbar() {
                return this.rotas.filter(rota => (!rota.drawerOnly))
            }
        }
    }
</script>
