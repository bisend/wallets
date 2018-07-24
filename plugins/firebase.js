import * as firebase from 'firebase'

if ( ! firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAitiEydY2i0nR8u5O1hxDluOh7GVyo4WE",
        authDomain: "wallets-d4ab2.firebaseapp.com",
        databaseURL: "https://wallets-d4ab2.firebaseio.com",
        projectId: "wallets-d4ab2",
        storageBucket: "wallets-d4ab2.appspot.com",
        messagingSenderId: "1006933498496"
    })
}

export default firebase