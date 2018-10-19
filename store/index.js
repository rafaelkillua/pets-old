import Vuex from 'vuex'
import {auth} from "~/services/fireinit"

const createStore = () => {
    return new Vuex.Store({

        state: () => ({
            user: null
        }),

        getters: {
            isAuthenticated(state) {
                return !!state.user;
            },
            getLoggedUser(state) {
                return state.user;
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
            signUp(ctx, {email, senha}) {
                return new Promise((resolve, reject) => {
                    auth.createUserWithEmailAndPassword(email, senha)
                        .then(response => {
                            ctx.commit("login", response.user);
                            resolve(response.user);
                        })
                        .catch(error => reject(error))
                })
            },
            login(ctx, {email, senha}) {
                return new Promise((resolve, reject) => {
                    auth.signInWithEmailAndPassword(email, senha)
                        .then(response => {
                            ctx.commit("login", response.user);
                            resolve(response.user);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
            },
            logout(ctx) {
                auth.signOut()
                    .then(ctx.commit("logout"));
            }
        },
    })
};

export default createStore
