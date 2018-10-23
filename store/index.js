import Vuex from 'vuex'
import {auth, db} from "~/services/fireinit"
import avatar from "~/static/avatar.jpg"

const createStore = () => {
    return new Vuex.Store({

        state: () => ({
            user: null,
            erro: null,
            sucesso: null
        }),

        getters: {
            getLoggedUser(state) {
                return state.user;
            },
            getErro(state) {
                return state.erro;
            },
            getSucesso(state) {
                return state.sucesso;
            }
        },

        mutations: {
            login: (state, user) => {
                state.user = user;
            },
            logout: state => {
                state.user = null;
            },
            setUser: state => {
                state.user = auth.currentUser;
            },
            setErro: (state, erro) => {
                state.erro = erro;
            },
            removeErro: state => {
                state.erro = null;
            },
            setSucesso: (state, sucesso) => {
                state.sucesso = sucesso;
            },
            removeSucesso: state => {
                state.sucesso = null;
            }
        },

        actions: {
            signUp(ctx, {email, senha, nome, telefone}) {
                return new Promise((resolve, reject) => {
                    auth.createUserWithEmailAndPassword(email, senha)
                        .then(response => {
                            auth.currentUser.updateProfile({
                                displayName: nome,
                                photoURL: avatar
                            })
                                .then(() => {
                                    db.ref("telefones/" + auth.currentUser.uid).set({
                                        telefone
                                    })
                                        .then(() => ctx.commit("login", response.user))
                                        .catch(erro => console.log("Erro ao guardar telefone: " + erro.message))
                                })
                                .catch(erro => console.log("Erro ao atualizar perfil: " + erro));

                        })
                        .catch(error => reject(error))
                })
            },

            login(ctx, {email, senha}) {
                return new Promise((resolve, reject) => {
                    auth.signInWithEmailAndPassword(email, senha)
                        .then(response => {
                            ctx.commit("login", response.user);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
            },

            logout(ctx) {
                auth.signOut()
                    .then(ctx.commit("logout"));
            },
        },
    })
};

export default createStore
