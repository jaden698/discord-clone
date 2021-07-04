import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyA9e4uMDn3k2r6fqBOy_BI1pF3rLJMhk9I",
    authDomain: "discord-clone-cd4bd.firebaseapp.com",
    projectId: "discord-clone-cd4bd",
    storageBucket: "discord-clone-cd4bd.appspot.com",
    messagingSenderId: "520674936136",
    appId: "1:520674936136:web:0621a89c31be894cdcdf7d",
    measurementId: "G-4JYMPPMLS1"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore()

  const auth=firebaseApp.auth()

  const provider=new firebase.auth.GoogleAuthProvider()

  export {auth,provider}

  export default db

  