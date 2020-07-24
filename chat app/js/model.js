const model={}
model.currentUser={}
model.register=(data)=>{
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(res=>{
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName +' '+ data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
        alert('The email has been registered. Please check your email.')
        view.setActiveScreen('loginScreen')
    }).catch(err => {
        console.log(err);
        alert(err.message)
    })
}

model.login= async (data)=>{
    
    const response= await firebase.auth().signInWithEmailAndPassword(data.email,data.password)
    console.log(response);
    if(response.user.emailVerified==false){
        alert('Please verify your email.')
    } else {
        model.currentUser={
            displayName: response.user.displayName,
            email: response.user.email
        }
        console.log(`Welcome ${currentUser.displayName}`);
        view.setActiveScreen('chatScreen')
    }
}
