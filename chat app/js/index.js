
const init =()=>{
    // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtl2UQvadU86rWpyKZlulej8nnizFP_xg",
  authDomain: "chat-app-1e12b.firebaseapp.com",
  databaseURL: "https://chat-app-1e12b.firebaseio.com",
  projectId: "chat-app-1e12b",
  storageBucket: "chat-app-1e12b.appspot.com",
  messagingSenderId: "985046194273",
  appId: "1:985046194273:web:93efa9deb0c8ff6f453220",
  measurementId: "G-XP3WYJLTJR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase.app().name);

// firestoreFunction()

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    if (user.emailVerified) {
      model.currentUser = {
        displayName: user.displayName,
        email: user.email
      }
      view.setActiveScreen('chatScreen')
    } else {
      view.setActiveScreen('loginScreen')
      alert('Please verify your email')
    }
  } else {
    view.setActiveScreen('loginScreen')
  }
});

}
window.onload=init;

firestoreFunction = async () =>{
  // get 1 document
const documentId = 'YsOa1nnxEsIEnmaFUZIT'
const  respone = await firebase.firestore().collection('users').doc(documentId).get()
const user= getDataFromDoc(respone)
// respone.data()
// user.id=respone.id
// console.log(user);

  // get many documents
const respone2= await firebase.firestore().collection('users').where('phoneNumber','array-contains','456').get()
// console.log(respone2);
const listUser = getDataFromDocs(respone2.docs)
console.log(listUser);
// console.log(getDataFromDoc(respone2.docs[1]));

  // add  a document
const userToAdd ={
  name: 'ABC',
  age: 19,
  email: 'abcxyz@gmail.com'
}
// firebase.firestore().collection('users').add(userToAdd)

  // update document
const documentIdUpdate='YsOa1nnxEsIEnmaFUZIT'
const dataToUpdate={
  name: 'Nguyen Van B',
  address: 'Ha Noi',
  phoneNumber: firebase.firestore.FieldValue.arrayUnion('091')
}
firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate)

  // delete document
  const docToDelete='4pspKALAkiuJLtV7HWXH'
  firebase.firestore().collection('users').doc(docToDelete).delete()
}

getDataFromDoc=(doc)=>{
  const data= doc.data()
  data.id=doc.id
  return data
}
getDataFromDocs=(docs) =>{
  return docs.map(item=>getDataFromDoc(item))
  // for(let i=0; i<docs.length ;i++){
  //   const element =getDataFromDoc(docs[i])
  //   listData.push(element)
  // }
  // return listData
}