import * as firebase from 'firebase/app';
 
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/messaging';
import "firebase/performance";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
});

const database = firebaseApp.database();
const auth = firebaseApp.auth();
const messaging = firebaseApp.messaging();
const analytics = firebaseApp.analytics();
const performance = firebase.performance();

messaging.usePublicVapidKey("BFpEHR0UHDMxqVkWLbe884ukhegFUVl-SPUGpDaG2PG9BaQMr5BmNeq3BAyzMfqMD-kiJV-dwQKEDcubgNMRozw");

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log("FCM Listener =>", payload);
      resolve(payload);
    });
});

export { messaging, database, auth, firebaseApp as app, analytics, performance };
