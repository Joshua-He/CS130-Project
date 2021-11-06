import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
    return this.db.collection("users").doc(userId).set({
      fullName: fullName,
      email: email,
      isInstructor: isInstructor,
      userId: userId,
      queues: [],
    })
  };

  dbGetUserInfo = (userId) => {
    return this.db.collection("users").doc(userId).get();
  }

  dbUpdateUserInfo = (userId, fullName, isInstructor) => {
    return this.db.collection("users").doc(userId).update({
      fullName: fullName,
      isInstructor: isInstructor,
    })
  }

  doCreateQueue = (userId, description) => {
    let collection = this.db.collection("queue");
    let token = collection.doc().id;
    collection.doc(token).set({
      description: description,
      isDeleted: false,
      ownerId: userId,
      tickets: [],
    });
    this.db.collection("users").doc(userId).update({
        queues: firebase.firestore.FieldValue.arrayUnion(token)
      })
    ;
    return token;
  }

}

export default Firebase;
