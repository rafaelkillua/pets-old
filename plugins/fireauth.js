import {auth} from '~/services/fireinit'

export default context => {
    const {store} = context;

    auth.useDeviceLanguage();
    auth.onAuthStateChanged(user => {
        if (user) {
            return store.dispatch('afterLogin', user);
        } else {
            return store.dispatch('logout');
        }
    })
}
