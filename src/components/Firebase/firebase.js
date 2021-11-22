// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {firestoreConfig} from '../../configuration';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = firestoreConfig;
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
      isInstructor: isInstructor === "true" ? true : false,
      userId: userId,
      queues: [],
    })
  };

  dbGetUserInfo = (userId) => {
    return this.db.collection("users").doc(userId);
  }

  dbUpdateUserInfo = (userId, fullName, isInstructor) => {
    return this.db.collection("users").doc(userId).update({
      fullName: fullName,
      isInstructor: isInstructor === "true" ? true : false,
    })
  }

  dbCreateQueue = (userId, name, description, announcement, location, vLocation, startTime, endTime) => {
    let collection = this.db.collection("queue");
    let token = collection.doc().id;
    collection.doc(token).set({
      name: name,
      announcement: announcement,
      location: location,
      vLocation: vLocation,
      startTime: startTime,
      endTime: endTime, 
      description: description,
      isDeleted: false,
      ownerId: userId,
      tickets: [],
    });
    return this.db.collection("users").doc(userId).update({
        queues: firebase.firestore.FieldValue.arrayUnion(token)
      })
    ;
  }

  dbDeleteQueue = (queueId) => {
    return this.db.collection("queue").doc(queueId).update({
      isDeleted: true,
    })
  }

  dbDeleteTicket = (ticketId) => {
    return this.db.collection("ticket").doc(ticketId).update({
      isResolved: true,
    })
  }

  dbEditQueueDescription = (queueId, newDescription) => {
    return this.db.collection("queue").doc(queueId).update({
      description: newDescription,
    })
  }

  dbEditQueue = (queueId, queueName, description, announcement, queueLocation, queueVLocation, queueStartTime, queueEndTime) => {
    return this.db.collection("queue").doc(queueId).update({
      name: queueName,
      description: description,
      announcement: announcement,
      location: queueLocation,
      vLocation: queueVLocation,
      startTime: queueStartTime,
      endTime: queueEndTime,
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
