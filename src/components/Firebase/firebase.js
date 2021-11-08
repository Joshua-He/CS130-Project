import firebase from "firebase";
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
  dbGetQueue = (queueId) => {
    return this.db.collection("queue").doc(queueId);
  }
  
  dbCreateTicket = (description, ownerName, userId) => {
    return this.db.collection("ticket").add({
      description: description,
      ownerName: ownerName,
      userId: userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      isResolved: false,
    })
  };

  dbGetTicket = (ticketId) => {
    return this.db.collection("ticket").doc(ticketId);
  }

  dbAddTicketToQueue = (ticketId, queueId, createdAt) => {
    console.log("add ticket to queue")
    return this.db.collection("queue").doc(queueId).update({
      [`tickets.${ticketId}`]:createdAt
    })
  }
}

export default Firebase;
