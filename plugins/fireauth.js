import {auth} from '~/services/fireinit'

export default context => {
    const {store} = context;

    return new Promise((resolve) => {
        auth.useDeviceLanguage();
        auth.onAuthStateChanged(user => {
            if (user) {
                return resolve(store.dispatch('afterLogin', user));
            } else {
                return resolve(store.dispatch('logout'));
            }
        })
    })
}
