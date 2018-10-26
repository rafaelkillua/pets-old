<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 lg6>
            <v-card class="v-layout-item v-size-50 v-small-size-100">

                <v-card-title primary-title>
                    <div class="headline">Meu Perfil</div>
                </v-card-title>

                <v-card-text>

                    <v-card flat tile class="d-flex">
                        <button @click="clickImage">
                            <v-img
                                :src="form.avatar"
                                :lazy-src="form.avatar"
                                aspect-ratio="1"
                                max-height="200"
                                contain
                            >
                                <v-layout
                                    slot="progress"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                            </v-img>
                        </button>
                    </v-card>

                    <input ref="input" type="file" :accept="accept" @change="onFileChange">

                    <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="submit">
                        <v-text-field
                            v-model.trim="form.nome"
                            :rules="rules.nomeRules"
                            label="Nome e Sobrenome"
                            required
                            counter="30"
                            prepend-icon="face"
                            type="text"
                            name="nome"
                            autocomplete="name"
                        />
                        <v-text-field
                            v-model.trim="form.telefone"
                            :rules="rules.telefoneRules"
                            label="Telefone"
                            required
                            prepend-icon="phone"
                            type="text"
                            name="telefone"
                            mask="(##) #####-####"
                            autocomplete="phone"
                            hint="Seu telefone só será visível para usuários autenticados"
                        />
                        <v-text-field
                            v-model.trim="form.email"
                            :rules="rules.emailRules"
                            label="E-mail"
                            name="email"
                            required
                            prepend-icon="mail"
                            type="email"
                            autocomplete="email"
                        />
                    </v-form>

                </v-card-text>

                <v-card-actions>
                    <v-btn @click="submit" flat color="primary" :disabled="!valid">Editar</v-btn>
                    <v-spacer/>
                    <v-btn @click="clear" flat color="secondary">Desfazer Alterações</v-btn>
                </v-card-actions>

            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>
    import needAuth from "~/middleware/needAuth";

    export default {
        name: "Perfil",
        middleware: needAuth,

        created() {
            this.setForm();
        },

        data() {
            return {
                accept: false,
                form: {
                    avatar: "",
                    nome: "",
                    telefone: "",
                    email: "",
                    senha: "",
                    repetirSenha: ""
                },
                rules: {
                    nomeRules: [
                        v => !!v || "Nome é obrigatório",
                        v => v && v.length >= 5 || "Nome está muito curto",
                        v => v && v.length <= 30 || "Nome está muito longo"
                    ],
                    telefoneRules: [
                        v => !!v || "Telefone é obrigatório",
                        v => v && v.length === 10 || v.length === 11 || "Telefone inválido"
                    ],
                    emailRules: [
                        v => !!v || "E-mail é obrigatório",
                        v => v && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail tem que ser válido"
                    ],
                    senhaRules: [
                        v => !!v || "Senha é obrigatória",
                        v => v && v.length >= 8 || "Senha deve ter mais de 8 caracteres",
                        v => v && v.length <= 20 || "Senha deve ter menos de 20 caracteres"
                    ],
                    repetirSenhaRules: [
                        v => !!v || "Repetir senha é obrigatório",
                    ]
                },
                valid: true,
                showPassword: false
            }
        },

        computed: {
            user() {
                return this.$store.getters.getLoggedUser
            }
        },

        methods: {
            confirmaSenha() {
                return (this.form.repetirSenha === this.form.senha) ? "" : "As senhas devem ser iguais"
            },
            submit() {
                const email = this.form.email;
                const senha = this.form.senha;
                const nome = this.form.nome;
                const telefone = this.form.telefone;

                // if (this.$refs.form.validate()) {
                //     this.$store.dispatch("signUp", {email, senha, nome, telefone})
                //         .catch(erro => {
                //             alert(erro.code + " - " + erro.message);
                //             // this.$store.dispatch("erro", erro);
                //         })
                // }
            },
            clear() {
                this.$refs.form.resetValidation();
                this.setForm();
            },
            setForm() {
                this.form = {
                    nome: this.user.nome,
                    avatar: this.user.avatar,
                    email: this.user.email,
                    telefone: this.user.telefone
                };
            },
            clickImage() {
                this.$refs.input.click();
            },
            onFileChange($event){
                console.log($event.target.files[0]);
            }
        }
    }
</script>

<style scoped>

    form {
        margin: 20px;
    }

    input[type=file] {
        position: absolute;
        left: -99999px;
    }

</style>
