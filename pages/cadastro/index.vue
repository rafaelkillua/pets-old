<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="v-layout-item v-size-50 v-small-size-100">

                <v-card-title primary-title>
                    <div class="headline">Cadastro</div>
                </v-card-title>

                <v-card-text>

                    <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="submit">
                        <v-text-field
                            v-model.trim="form.nome"
                            :error-messages="nomeErrors"
                            label="Nome"
                            required
                            counter="30"
                            prepend-icon="face"
                            type="text"
                            name="nome"
                            autocomplete="name"
                            @input="$v.form.nome.$touch()"
                            @blur="$v.form.nome.$touch()"
                        />
                        <v-text-field
                            v-model.trim="form.telefone"
                            :error-messages="telefoneErrors"
                            label="Telefone"
                            required
                            prepend-icon="phone"
                            type="text"
                            name="telefone"
                            mask="(##) #####-####"
                            autocomplete="phone"
                            hint="Seu telefone só será visível para usuários autenticados"
                            @input="$v.form.telefone.$touch()"
                            @blur="$v.form.telefone.$touch()"
                        />
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
                            @input="$v.form.senha.$touch()"
                            @blur="$v.form.senha.$touch()"
                            @click:append="showPassword = !showPassword"
                        />
                        <v-text-field
                            v-model.trim="$v.form.repetirSenha.$model"
                            :error-messages="repetirSenhaErrors"
                            label="Repetir senha"
                            required
                            prepend-icon="lock"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                            name="repetirSenha"
                            @input="$v.form.repetirSenha.$touch()"
                            @blur="$v.form.repetirSenha.$touch()"
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
                    <v-btn @click="submit" flat color="primary" :disabled="!valid">Cadastrar</v-btn>
                    <v-spacer/>
                    <v-btn @click="reset" flat color="secondary" :disabled="sending">Resetar</v-btn>
                </v-card-actions>

            </v-card>

            <v-snackbar
                :value="cadastrado"
                :bottom="true"
                color="success"
            >
                <v-icon left color="white">check</v-icon>
                {{ lastUser }} cadastrado com sucesso! <br/> Redirecionando...
            </v-snackbar>

            <v-snackbar
                :value="emailJaCadastrado"
                :bottom="true"
                color="error"
            >
                <v-icon left color="white">error</v-icon>
                Este e-mail já está cadastrado
            </v-snackbar>

            <v-snackbar
                :value="senhaFraca"
                :bottom="true"
                color="error"
            >
                <v-icon left color="white">error</v-icon>
                Senha fraca
            </v-snackbar>

        </v-flex>
    </v-layout>
</template>

<script>
    import {auth, db} from '~/services/fireinit'

    import {validationMixin} from "vuelidate";
    import {email, maxLength, minLength, required, sameAs} from "vuelidate/lib/validators";

    export default {
        name: "Cadastro",
        mixins: [validationMixin],

        data: () => ({
            form: {
                nome: "",
                telefone: "",
                email: "",
                senha: "",
                repetirSenha: ""
            },
            valid: false,
            showPassword: false,
            cadastrado: false,
            sending: false,
            lastUser: null,
            emailJaCadastrado: false,
            senhaFraca: false
        }),

        validations: {
            form: {
                nome: {
                    required,
                    maxLength: maxLength(30)
                },
                telefone: {
                    required
                },
                email: {
                    required,
                    email
                },
                senha: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(20)
                },
                repetirSenha: {
                    sameAsPassword: sameAs('senha')
                }
            }
        },

        computed: {
            nomeErrors() {
                const errors = [];
                if (!this.$v.form.nome.$dirty) return errors;
                !this.$v.form.nome.required && errors.push('Nome obrigatório');
                !this.$v.form.nome.maxLength && errors.push('Nome deve ter 30 caracteres ou menos');
                return errors;
            },
            telefoneErrors() {
                const errors = [];
                if (!this.$v.form.telefone.$dirty) return errors;
                !this.$v.form.telefone.required && errors.push('Telefone obrigatório');
                return errors;
            },
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
                !this.$v.form.senha.minLength && errors.push('Senha deve conter mais de 8 caracteres');
                !this.$v.form.senha.maxLength && errors.push('Senha deve conter menos de 20 caracteres');
                return errors;
            },
            repetirSenhaErrors() {
                const errors = [];
                if (!this.$v.form.repetirSenha.$dirty) return errors;
                !this.$v.form.repetirSenha.sameAsPassword && errors.push('Senhas devem ser idênticas');
                return errors;
            }
        },

        methods: {
            submit() {
                this.sending = true;
                if (this.$refs.form.validate() && !this.$v.$invalid) {
                    auth.createUserWithEmailAndPassword(this.form.email, this.form.senha)
                        .then((response) => {
                            db.ref('usuarios/' + response.user.uid).set({
                                nome: this.form.nome,
                                telefone: this.form.telefone
                            });
                            this.cadastrado = true;
                            this.sending = false;
                            this.lastUser = response.user.email;
                            setTimeout(() => this.$router.push("/"), 3000);
                        })
                        .catch((erro) => {
                            if (erro.code === "auth/email-already-in-use") this.emailJaCadastrado = true;
                            else if (erro.code === "auth/weak-password") this.senhaFraca = true;
                            else alert(erro.code + " - " + erro.message);
                            this.sending = false;
                            setTimeout(() => (this.emailJaCadastrado = false) && (this.senhaFraca = false), 3000);
                        });
                } else {
                    this.sending = false;
                    this.$v.$touch();
                }
            },
            reset() {
                this.$refs.form.reset();
                this.$v.$reset();
                this.emailJaCadastrado = false;
                this.senhaFraca = false;
            }
        }
    }
</script>

<style scoped>
    form {
        margin: 20px;
    }
</style>
