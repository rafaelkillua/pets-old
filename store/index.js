import Vuex from 'vuex'
import {auth, db, storage} from "~/services/fireinit"
import avatar from "~/static/avatar.jpg"

const createStore = () => {
    return new Vuex.Store({

        state: () => ({
            user: null,
            erro: null,
            sucesso: null,
            progressoUpload: 0
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
            getProgresso(state) {
                return state.progressoUpload;
            },
        },

        mutations: {
            setUser: (state, user) => {
                state.user = user;
            },
            setErro: (state, erro) => {
                state.erro = erro;
            },
            setSucesso: (state, sucesso) => {
                state.sucesso = sucesso;
            },
            setProgress: (state, progresso) => {
                state.progressoUpload = progresso
            }
        },

        actions: {
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
                    ctx.dispatch("sucesso", usuario.nome + " logado com sucesso!")
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
                    .then(ctx.commit("setUser", null));
            },

            sucesso(ctx, sucesso) {
                ctx.commit('setSucesso', sucesso);
            },

            erro(ctx, erro) {
                ctx.commit('setErro', erro);
            },

            limparErros(ctx) {
                ctx.commit('setSucesso', null);
                ctx.commit('setErro', null);
            },

            editProfile(ctx, {nome, telefone, avatar}) {

                if (avatar) {
                    const uploadTask = storage.ref("avatar/" + auth.currentUser.uid).put(avatar);
                    uploadTask.on('state_changed', snapshot => {
                        let progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        ctx.commit("setProgress", progresso);
                    }, error => {
                        console.log(error)
                    }, () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(url => {
                                db.ref("perfil/" + auth.currentUser.uid).update({
                                    nome,
                                    telefone,
                                    avatar: url
                                })
                                    .then(() => ctx.dispatch("sucesso", "Perfil editado com sucesso!"))
                            });
                    });

                } else {
                    db.ref("perfil/" + auth.currentUser.uid).update({
                        nome,
                        telefone,
                    }).then(() => ctx.dispatch("sucesso", "Perfil editado com sucesso!"))
                }
            }
        },
    })
};

export default createStore
