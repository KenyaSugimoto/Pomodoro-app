import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDKuNV-ILwOWihttEK2SFka6S31FsfHkyg',
  authDomain: 'pomodoroapp-eb9ac.firebaseapp.com',
  projectId: 'pomodoroapp-eb9ac',
  storageBucket: 'pomodoroapp-eb9ac.appspot.com',
  messagingSenderId: '1066453499088',
  appId: '1:1066453499088:web:33922e8a797edc7385b2d5',
  measurementId: 'G-7ZNYXYLY5J',
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const auth = firebase.auth()
