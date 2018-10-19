<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="v-layout-item v-size-50 v-small-size-100">

                <v-card-title primary-title>
                    <div class="headline">Login</div>
                </v-card-title>

                <v-card-text>

                    <v-form ref="form" lazy-validation @keyup.native.enter="submit">
                        <v-text-field
                            v-model.trim="form.email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            prepend-icon="mail"
                            type="email"
                            name="email"
                            autocomplete="email"
                            @input="$v.form.email.$touch()"
                            @blur="$v.form.email.$touch()"
                        />
                        <v-text-field
                            v-model.trim="$v.form.senha.$model"
                            :error-messages="senhaErrors"
                            label="Senha"
                            required
                            prepend-icon="lock"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                            name="senha"
                            hint="Senha tem 8-20 caracteres"
                            @input="$v.form.senha.$touch()"
                            @blur="$v.form.senha.$touch()"
                            @click:append="showPassword = !showPassword"
                        />
                    </v-form>

                </v-card-text>

                <v-card-actions>
                    <v-btn @click="submit" flat color="primary" :disabled="this.$v.$invalid">Login</v-btn>
                    <v-spacer/>
                    <v-btn @click="reset" flat color="secondary">Resetar</v-btn>
                </v-card-actions>

            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>
    import {validationMixin} from "vuelidate";
    import {email, required} from "vuelidate/lib/validators";

    export default {
        name: "Login",
        mixins: [validationMixin],
        // middleware: needAnonymous,

        data: () => ({
            form: {
                email: "",
                senha: ""
            },
            showPassword: false,
        }),

        validations: {
            form: {
                email: {
                    required,
                    email
                },
                senha: {
                    required
                }
            }
        },

        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.form.email.$dirty) return errors;
                !this.$v.form.email.email && errors.push('E-mail inválido');
                !this.$v.form.email.required && errors.push('E-mail obrigatório');
                return errors;
            },
            senhaErrors() {
                const errors = [];
                if (!this.$v.form.senha.$dirty) return errors;
                !this.$v.form.senha.required && errors.push('Senha obrigatória');
                return errors;
            }
        },

        methods: {
            submit() {
                this.sending = true;
                if (this.$refs.form.validate() && !this.$v.$invalid) {
                    this.$store.dispatch("login", {email: this.form.email, senha: this.form.senha})
                        .then((user) => {
                        })
                        .catch((erro) => {
                            alert(erro.code + " - " + erro.message)
                            //dispatch erro
                        });
                } else {
                    this.$v.$touch();
                }
            },
            reset() {
                this.$refs.form.reset();
                this.$v.$reset();
            }
        }
    }
</script>

<style scoped>
    form {
        margin: 20px;
    }
</style>
