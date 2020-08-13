const model = {}
model.currentUser = undefined

model.conversations=undefined
model.currentConversation=undefined

model.collectionName='conversations'

model.register = async (data) => {
  try {
   await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    firebase.auth().currentUser.updateProfile({
      displayName: data.firstName + ' ' + data.lastName
    })
    firebase.auth().currentUser.sendEmailVerification()
    alert('The email has been registered, please check you email!')
    view.setActiveScreen('loginScreen')
  } catch(err) {
    console.log(err)
    if(err.message==='The email address is already in use by another account.'){
        document.getElementById('email-error').innerText='*The email address is already in use by another account.'
    }
    if(err.message==='Password should be at least 6 characters'){
        document.getElementById('password-error').innerText='*Password should be at least 6 characters'
    }
    //alert(err.message)
  }
 
  // .then((res) => {
  //   firebase.auth().currentUser.updateProfile({
  //     displayName: data.firstName + ' ' + data.lastName
  //   })
  //   firebase.auth().currentUser.sendEmailVerification()
  // }).catch((err) => {
  //   console.log(err)
  // })
}
model.login = async (dataLogin) => {
  try {
    const response = await firebase.auth()
    .signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
    // console.log(response)
    // if(response.user.emailVerified === false) {
    //   alert('Please verify your email!')
    // } else {
    //   model.currentUser = {
    //     displayName: response.user.displayName,
    //     email: response.user.email
    //   }
    //   view.setActiveScreen('chatScreen')
    // }
  } catch(err) {
    console.log(err)
    if(err.code==='auth/wrong-password'){
        document.getElementById('password-error').innerText='The password is invalid or the user does not have a password.'
    }
    if(err.code==='auth/user-not-found'){
        document.getElementById('email-error').innerText='There is no user record corresponding to this identifier. The user may have been deleted.'
    }
  }
}

// model.chat = async () => {
// //    try {
// //      firebase.auth().onAuthStateChanged(function(user) {
// //     if (user) {
// //       // User is signed in.
// //       console.log(user);
// //       model.currentUser = {
// //         displayName: user.displayName,
// //         email: user.email
// //       }
// //       view.setActiveScreen('chatScreen')
// //     } else {
// //       // User chua loginlogin
// //       view.setActiveScreen('registerScreen');
// //     }
// //   });
// // } catch(error) {
// //   console.log(error.message);
// // }

//   try {
//      await firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in.
//         if (user.emailVerified) {
//           model.currentUser = {
//             displayName: user.displayName,
//             email: user.email
//           }
//           view.setActiveScreen('chatScreen')
//         } else {
//           view.setActiveScreen('loginScreen')
//           alert('Please verify your email')
//         }
//       } else {
//         view.setActiveScreen('loginScreen')
//       }
//     });
//   } catch (error) {
//     alert(error.message)
//   }
// }
model.addMessage=(message)=>{
  const documentIdUpdate='j8BiExiYwBuruWKkyHpU'
    const messageToAdd={
         messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection(model.collectionName).doc(documentIdUpdate).update(messageToAdd)

}

model.loadConversations= async ()=>{
  const response= await firebase.firestore().collection(model.collectionName)
  .where('users','array-contains',model.currentUser.email)
  .get()
  model.conversations=getDataFromDocs(response.docs)
  if(model.conversations.length > 0) {
    model.currentConversation= model.conversations[0];
    view.showCurrentConversation()
  }
  view.showConversations()
}

model.listenConversationsChange=()=>{
  let isFirstRun= true
  firebase.firestore().collection(model.collectionName)
  .where('users','array-contains',model.currentUser.email)
  .onSnapshot((res) => {
    if(isFirstRun){
      isFirstRun = false
      return
    }
    const docChanges = res.docChanges()
    console.log(docChanges);
    for(oneChange of docChanges){
      console.log(oneChange);
      const type=oneChange.type
      if(type === 'modified'){
        const docData= getDataFromDoc(oneChange.doc)
        console.log(docData);
        // update lai model.conversations
        for(let i=0; i<model.conversations.length; i++){
          if(model.conversations[i].id === docData.id){
            model.conversations[i] = docData
          }
        }
        // update model.currentConversation
        if(docData.id === model.currentConversation.id){
          model.currentConversation = docData
          const lastMessage = docData.messages[docData.messages.length-1]
          console.log(lastMessage);
          view.addMessage(lastMessage)
          view.scrollToEndElement()
        }
      }
    }
  })
}

model.createConversation=(dataCreate)=>{
  const conversationToAdd={
    createdAt: new Date().toISOString(),
    title: dataCreate.title,
    users: ['huyapolo34@gmail.com', dataCreate.email]
  }
  firebase.firestore().collection('conversations').add(conversationToAdd)

}