<template>
    <v-navigation-drawer
        app
        :value="drawer"
        absolute
        temporary
    >
        <v-list class="pa-1">
            <v-list-tile avatar v-if="user" nuxt to="/perfil">
                <v-list-tile-avatar>
                    <img :src="user.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{user.email}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar v-if="!user" nuxt to="/login">
                <v-list-tile-avatar v-if="!user">
                    <img src="~static/avatar.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title to="/login">Cadastre-se ou faça login</v-list-tile-title>
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
</template>

<script>
    export default {
        props: ["user", "rotas", "drawer"],
    }
</script>
