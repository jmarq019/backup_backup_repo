import firebase from "firebase/compat/app";
import 'firebase/compat/storage';


  
const firebaseConfig = {
    apiKey: "AIzaSyDvJ3xgTW1oyfFdYo0DjgIBMSY3W2DdZWU",
    authDomain: "got-you-d121f.firebaseapp.com",
    projectId: "got-you-d121f",
    storageBucket: "got-you-d121f.appspot.com",
    messagingSenderId: "314306934256",
    appId: "1:314306934256:web:359c5c8b9dbc580a359935"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;