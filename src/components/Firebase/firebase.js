import * as firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAW2TRanMIPEI7fd9ASkt6WaCcDheRnJtI",
  authDomain: "kyoo-55fd2.firebaseapp.com",
  projectId: "kyoo-55fd2",
  storageBucket: "kyoo-55fd2.appspot.com",
  messagingSenderId: "955272904423",
  appId: "1:955272904423:web:99fec79e64b45a5ea52c42",
  measurementId: "G-MBSW0XPYXB"
};

class Firebase {
  constructor() {
    this.app = firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email,password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

  // *** cloud firestore API ***
  dbCreateUser = (email, fullName, isInstructor, userId) => {
    console.log('Inside doCreateUser');
    let ref = this.db.collection('users').get();
    console.log(ref);
    // firebase.firestore().collection("users").doc(userId).set({
    //   fullName: fullName,
    //   email: email,
    //   isInstructor: isInstructor,
    //   userId: userId,
    //   queues: [],
    // })
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  };
}

export default Firebase;
