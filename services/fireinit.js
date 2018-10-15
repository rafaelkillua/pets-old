import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

firebase.initializeApp({
    apiKey: "AIzaSyACfeKhAs8D2XOpxduJSfbZ1c9dpOFpPow",
    authDomain: "pets-2650.firebaseapp.com",
    databaseURL: "https://pets-2650.firebaseio.com",
    projectId: "pets-2650",
    storageBucket: "pets-2650.appspot.com",
    messagingSenderId: "679136849663"
});

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();
export default firebase;
