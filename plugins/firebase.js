// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'

export default ({ app }, inject) => {
  if (!firebase.apps.length) {
    // 最初だけFirebaseを使うためにinitializeAppしてinject
    firebase.initializeApp(process.env.firebaseConfig)
    inject('firebase', firebase)
  }
  // AuthとFirestoreを取得
  const fireauth = firebase.auth()
  const firestore = firebase.firestore()
//   firestore.settings({
//     timestampsInSnapshots: true
//   })
  const { increment } = firebase.firestore.FieldValue
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
  // AuthとFirestoreを使うためにinject
  inject('auth', fireauth)
  inject('firestore', firestore)
  inject('firestoreServerTimestamp', serverTimestamp)
  inject('firestoreIncrement', increment)
}