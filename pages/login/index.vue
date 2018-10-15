<template>
    <v-app id="login">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="v-layout-item v-size-50 v-small-size-100">

                            <v-card-title primary-title>
                                <div class="headline">Login</div>
                            </v-card-title>

                            <v-card-text>

                                <v-form ref="form" v-model="valid" lazy-validation>
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

                                <v-progress-linear
                                    :indeterminate="true"
                                    v-if="sending"
                                    class="d-block"
                                />

                            </v-card-text>

                            <v-card-actions>
                                <v-btn @click="submit" flat color="primary" :disabled="sending && !valid">Login</v-btn>
                                <v-btn @click="reset" flat color="secondary" :disabled="sending">Resetar</v-btn>
                            </v-card-actions>

                        </v-card>

                        <v-snackbar
                            :value="logged"
                            :bottom="true"
                            color="success"
                        >
                            <v-icon color="white">check</v-icon>
                            {{ lastUser }} logado com sucesso! <br/> Redirecionando...
                        </v-snackbar>

                        <v-snackbar
                            :value="cantLogin"
                            :bottom="true"
                            color="error"
                            @click="cantLogin = !cantLogin"
                        >
                            <v-icon color="white">error</v-icon>
                            E-mail ou senha inválidos
                        </v-snackbar>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {auth} from '~/services/fireinit'

    import {validationMixin} from "vuelidate";
    import {email, required} from "vuelidate/lib/validators";

    export default {
        name: "Login",
        mixins: [validationMixin],

        data: () => ({
            form: {
                email: "",
                senha: ""
            },
            valid: false,
            showPassword: false,
            logged: false,
            sending: false,
            lastUser: null,
            cantLogin: false
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
                    auth.signInWithEmailAndPassword(this.form.email, this.form.senha)
                        .then((response) => {
                            this.logged = true;
                            this.sending = false;
                            this.lastUser = response.user.email;
                            setTimeout(() => location.assign("/"), 3000);
                        })
                        .catch(() => {
                            this.cantLogin = true;
                            this.sending = false;
                            setTimeout(() => this.cantLogin = false, 3000);
                        });
                } else {
                    this.sending = false;
                    this.$v.$touch();
                }
            },
            reset() {
                this.$refs.form.reset();
                this.$v.$reset();
                this.cantLogin = false;
            }
        }
    }
</script>

<style scoped>
    form {
        margin: 20px;
    }
</style>
