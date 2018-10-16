import {auth} from '~/services/fireinit'

export default context => {

    const {store} = context;

    return new Promise((resolve, reject) => {
        auth.useDeviceLanguage();
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log("PLUGIN");
                return resolve(store.commit('setUser', user));
            }
            return resolve();
        })
    })
}
