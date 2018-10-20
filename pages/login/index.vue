<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="v-layout-item v-size-50 v-small-size-100">

                <v-card-title primary-title>
                    <div class="headline">Login</div>
                </v-card-title>

                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="submit">
                        <v-text-field
                            v-model.trim="form.email"
                            :rules="rules.emailRules"
                            label="E-mail"
                            required
                            prepend-icon="mail"
                            type="email"
                            name="email"
                            autocomplete="email"
                        />
                        <v-text-field
                            v-model.trim="form.senha"
                            :rules="rules.senhaRules"
                            label="Senha"
                            required
                            prepend-icon="lock"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                            name="senha"
                            hint="Senha tem 8-20 caracteres"
                            @click:append="showPassword = !showPassword"
                        />
                    </v-form>

                </v-card-text>

                <v-card-actions>
                    <v-btn @click="submit" flat color="primary" :disabled="!valid">Login</v-btn>
                    <v-spacer/>
                    <v-btn @click="clear" flat color="secondary">Resetar</v-btn>
                </v-card-actions>

            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Login",
        // middleware: needAnonymous,

        data: () => ({
            form: {
                email: "",
                senha: ""
            },
            rules: {
                emailRules: [
                    v => !!v || "E-mail é obrigatório",
                    v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail tem que ser válido"
                ],
                senhaRules: [
                    v => !!v || "Senha é obrigatória"
                ]
            },
            showPassword: false,
            valid: true
        }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch("login", {email: this.form.email, senha: this.form.senha})
                        .catch((erro) => {
                            alert(erro.code + " - " + erro.message)
                            //dispatch erro
                        });
                }
            },
            clear() {
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>
    form {
        margin: 20px;
    }
</style>
