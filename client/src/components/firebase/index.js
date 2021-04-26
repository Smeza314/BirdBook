import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAaeMLn1sSynGuvcUbHTVcN863tYXrSa5k",
  authDomain: "fir-react-birdbook.firebaseapp.com",
  projectId: "fir-react-birdbook",
  storageBucket: "fir-react-birdbook.appspot.com",
  messagingSenderId: "338475154446",
  appId: "1:338475154446:web:9ff3282c0927ddda43105f",
  measurementId: "G-3E4FZ0H2C1"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }