import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC83UQR1c-IFY58ha5CBrnx-rMfNHUxRAE",
  authDomain: "react-native-multiplayer-dev.firebaseapp.com",
  databaseURL: "https://react-native-multiplayer-dev-default-rtdb.firebaseio.com",
  projectId: "react-native-multiplayer-dev",
  storageBucket: "react-native-multiplayer-dev.appspot.com",
  messagingSenderId: "5967659638",
  appId: "1:5967659638:web:ddffd264a3fdb6a2ce5557",
  measurementId: "G-FM5GSDLWB4"
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database();