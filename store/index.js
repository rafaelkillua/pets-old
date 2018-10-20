import Vuex from 'vuex'
import {auth, db} from "~/services/fireinit"

const createStore = () => {
    return new Vuex.Store({

        state: () => ({
            user: null,
            erro: null,
            sucesso: null
        }),

        getters: {
            isAuthenticated(state) {
                return !!state.user;
            },
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
            login(state, user) {
                state.user = user;
            },
            logout(state) {
                state.user = null;
            },
            setUser: state => {
                state.user = auth.currentUser;
            }
        },

        actions: {
            signUp(ctx, {email, senha, nome, telefone}) {
                return new Promise((resolve, reject) => {
                    auth.createUserWithEmailAndPassword(email, senha)
                        .then(response => {
                            auth.currentUser.updateProfile({
                                displayName: nome,
                                photoURL: "https://lh4.googleusercontent.com/7RVXCWsVqMboBOqAdig0eW8Co60qFqjhOtK3vihUHzhNAhmjb3wtDdrirhEdPHSOcD8ziEtgeQveXrca_OS06qvtELepfyqk0YAiA8tOMNME3x320RM=w371"
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
