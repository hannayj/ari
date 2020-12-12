import * as firebase from 'firebase'
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.manifest.extra.dbKey,
    authDomain: "rn-ari.firebaseapp.com",
    databaseURL: "https://rn-ari-default-rtdb.firebaseio.com",
    projectId: "rn-ari",
    storageBucket: "rn-ari.appspot.com",
    messagingSenderId: "746753334312",
}

//Initialize firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;