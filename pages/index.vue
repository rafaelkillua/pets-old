<template>
    <v-container grid-list-md text-xs-center>
        <v-layout align-center justify-center row wrap>
            <v-flex xs12>
                <h1>Bem vindo ao Pets Cariri!</h1>
            </v-flex>
            <v-flex xs12>
                <ul>
                    <p> [ ] Cadastro </p>
                    <p> [X] Login </p>
                    <p> [ ] Auth: {{usuarioLogado}}</p>
                    <p> [ ] Logout </p>
                    <p> [ ] Cadastrar Pet </p>
                    <p> [ ] Listar Pets </p>
                </ul>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {auth} from "../services/fireinit";

    console.log("auth", auth.currentUser);

    export default {
        data: () => ({
            usuarioLogado: auth.currentUser !== null ? auth.currentUser.email : "Sem usuário logado"
        })
    }
</script>
