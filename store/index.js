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
                console.log("store login")
            },
            logout(state) {
                state.user = null;
                console.log("store logout")
            }
        },

        actions: {
            login(ctx, user) {
                ctx.commit("login", user);
            },
            logout(ctx) {
                auth.signOut()
                    .then(ctx.commit("logout"));
            }
        }
    })
};

export default createStore
