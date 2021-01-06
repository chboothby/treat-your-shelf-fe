import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDHXh0FlBcSAOQo-BT7Zz5bT9GGmNyNDuI",
  authDomain: "treat-yo--shelf.firebaseapp.com",
  projectId: "treat-yo--shelf",
  storageBucket: "treat-yo--shelf.appspot.com",
  messagingSenderId: "1043126135539",
  appId: "1:1043126135539:web:503450c7c93ee62ce0e586",
  measurementId: "G-M2WEX0WKVY",
});

export const auth = app.auth();
export default app;
