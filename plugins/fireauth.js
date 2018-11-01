import {auth} from '~/services/fireinit'

export default async context => {
    const {store} = context;

    return await new Promise((resolve, reject) => {
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
