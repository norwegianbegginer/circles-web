import * as firebase from "firebase/app";
import { messaging } from "config/firebase";
import { setLocalStorageValue } from "storage/storage";

export const signInWithPopup = async () => {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithPopup(provider);
            })
            .then(function (result) {
                fetchAccountIdToken();
                resolve(result);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("🔒 Authorization =>", errorCode, errorMessage);
                reject(error);
            });

    });
}

export const signInWithCredentials = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .then((result) => {
                fetchAccountIdToken();
                resolve(result);
            })
            .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("🔒 Authorization =>", errorCode, errorMessage);
                reject(error);
            });
    });
}

export const fetchAccountIdToken = () => {
    const currentUser = firebase.auth()?.currentUser ?? null;

    if(currentUser)
        currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            setLocalStorageValue("accountIdToken", idToken);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("🔒 Authorization =>", errorCode, errorMessage);
        });
}

export const signUpWithCredentials = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
       firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("🔒 Authorization =>", errorCode, errorMessage);
                reject(error);
                // ...
            });
    });
}

export const signOut = async () => {
    return new Promise((resolve, reject) => {
       firebase.auth().signOut()
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("🔒 Authorization =>", errorCode, errorMessage);
                reject(error);
                // ...
            });
    });
}

export const getCurrentUserIdToken = async () => {
    return new Promise<string>((resolve, reject) => {
        firebase.auth()?.currentUser?.getIdToken(true).then(function(idToken) {
            resolve(idToken);
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("🔒 User Id Token =>", errorCode, errorMessage);
            reject(error);
          });
    });
}


export const getDeviceToken = async () => {
    return new Promise<string>((resolve, reject) => {
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                resolve(currentToken)
            } else {
                console.log("🔒 Device Token =>", "No Instance ID token available. Request permission to generate one.");
                reject(new Error("No Instance ID token available. Request permission to generate one."));
            }
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("🔒 Device Token =>", errorCode, errorMessage);
            reject(error);
        });
  
    });
}