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
            redirecionar() {
                this.$router.push(this.$router.history.current.query.redirect || "/");
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

            afterLogin(ctx, {uid, email}) {
                let usuario = {
                    uid,
                    email
                };
                db.ref('perfil/' + uid).on('value', snapshot => {
                    usuario = {
                        ...usuario,
                        nome: snapshot.val().nome,
                        avatar: snapshot.val().avatar,
                        telefone: snapshot.val().telefone
                    };
                    ctx.commit("setUser", usuario);
                    ctx.dispatch("sucesso", usuario.nome + " logado com sucesso!");
                    ctx.dispatch("redirecionar");
                })
                // .then(() => {
                //
                // })
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
                                .catch(erro => ctx.dispatch("erro", "Erro ao atualizar perfil: (" + erro.code + ") " + erro.message))
                        })
                        .catch(erro => {
                            ctx.dispatch("erro", "Erro ao criar usuário: (" + erro.code + ") " + erro.message);
                            reject(erro)
                        })
                })
            },

            login(ctx, {email, senha}) {
                return new Promise((resolve, reject) => {
                    auth.signInWithEmailAndPassword(email, senha)
                        .catch(erro => {
                            ctx.dispatch("erro", "Erro ao logar: (" + erro.code + ") " + erro.message);
                            reject(erro);
                        })
                })
            },

            logout(ctx) {
                auth.signOut()
                    .then(() => {
                        ctx.commit("setUser", null);
                        ctx.dispatch("redirecionar");
                    })
                    .catch((erro) => ctx.dispatch("erro", "Erro ao deslogar: (" + erro.code + ") " + erro.message));
            },

            editProfile(ctx, {nome, telefone, avatar}) {

                if (avatar) {
                    const uploadTask = storage.ref("avatar/" + auth.currentUser.uid).put(avatar);
                    uploadTask.on('state_changed', snapshot => {
                        let progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        ctx.commit("setProgress", progresso);
                    }, erro => {
                        ctx.dispatch("erro", "Erro ao fazer upload de imagem: (" + erro.code + ") " + erro.message);
                    }, () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(url => {
                                db.ref("perfil/" + auth.currentUser.uid).update({
                                    nome,
                                    telefone,
                                    avatar: url
                                })
                                    .then(() => {
                                        ctx.dispatch("sucesso", "Perfil editado com sucesso!");
                                        ctx.dispatch("redirecionar");
                                    })
                                    .catch(erro => ctx.dispatch("erro", "Erro ao atualizar perfil: (" + erro.code + ") " + erro.message))
                            });
                    });

                } else {
                    db.ref("perfil/" + auth.currentUser.uid).update({
                        nome,
                        telefone,
                    })
                        .then(() => {
                            ctx.dispatch("sucesso", "Perfil editado com sucesso!");
                            ctx.dispatch("redirecionar");
                        })
                        .catch(erro => ctx.dispatch("erro", "Erro ao atualizar perfil: (" + erro.code + ") " + erro.message))
                }
            }
        },
    })
};

export default createStore;
