import Vuex from 'vuex'
import {auth, db} from "~/services/fireinit"
import avatar from "~/static/avatar.jpg"

const createStore = () => {
    return new Vuex.Store({

        state: () => ({
            user: null,
            erro: null,
            sucesso: null,
            loading: true
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
            },
            getLoading(state) {
                return state.loading;
            }
        },

        mutations: {
            setUser: (state, user) => {
                state.user = user;
                state.loading = false;
            },
            setErro: (state, erro) => {
                state.erro = erro;
            },
            setSucesso: (state, sucesso) => {
                state.sucesso = sucesso;
            }
        },

        actions: {
            nuxtServerInit ({ commit }, { req }) {
                console.lig("entrou");
                if (req.user) {
                    console.log("ok");
                    commit('afterLogin', req.user)
                }
            },

            afterLogin(ctx, {uid, email}) {
                let usuario;
                db.ref('perfil/' + uid).on('value', snapshot => {
                    usuario = {
                        uid,
                        email,
                        nome: snapshot.val().nome,
                        avatar: snapshot.val().avatar,
                        telefone: snapshot.val().telefone
                    };
                    ctx.commit("setUser", usuario);
                });
            },

            signUp(ctx, {email, senha, nome, telefone}) {
                return new Promise((resolve, reject) => {
                    auth.createUserWithEmailAndPassword(email, senha)
                        .then(() => {
                            db.ref("perfil/" + auth.currentUser.uid).set({
                                nome,
                                telefone,
                                avatar
                            })
                                .catch(erro => console.log("Erro ao guardar dados: " + erro.message))
                        })
                        .catch(error => reject(error))
                })
            },

            login(ctx, {email, senha}) {
                return new Promise((resolve, reject) => {
                    auth.signInWithEmailAndPassword(email, senha)
                        .catch(error => {
                            reject(error);
                        })
                })
            },

            logout(ctx) {
                auth.signOut()
                    .then(ctx.commit("setUser", "nouser"));
            },
        },
    })
};

export default createStore
