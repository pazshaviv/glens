import * as firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSzDN7nrCEdKIDY8hnPvKV0eNbJpmZEDM",
    authDomain: "glens-tom.firebaseapp.com",
    databaseURL: "https://glens-tom.firebaseio.com",
    projectId: "glens-tom",
    storageBucket: "glens-tom.appspot.com",
    messagingSenderId: "315030804632",
    appId: "1:315030804632:web:6caa5875f9717844e298ed",
    measurementId: "G-H8MYMDRC4J"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;