const view={};
    view.setActiveScreen=(screenName)=>{
        switch (screenName) {
        case 'welcomeScreen' :
            document.getElementById('app').innerHTML=components.welcomeScreen;
            break;
        case 'loginScreen' :
            document.getElementById('app').innerHTML=components.loginScreen;
            const loginForm = document.getElementById('login-form');
            loginForm.addEventListener('submit',(event) => {
                event.preventDefault();
                console.log('Login');
                const data={
                    email: loginForm.email.value.trim(),
                    password: loginForm.password.value
                }
                controller.login(data);
            })
            break;
        case 'registerScreen' :
            document.getElementById('app').innerHTML=components.registerScreen;
            const registerForm= document.getElementById('register-form');
            registerForm.addEventListener('submit',(event)=>{
                event.preventDefault();
                console.log('Submit');
                const data={
                    firstName: registerForm.firstName.value,
                    lastName:  registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                console.log(data);
                controller.register(data);
            })
            break;
        case 'chatScreen' :
            document.getElementById('app').innerHTML=components.chatScreen 
            const sendMessageForm= document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', (e)=>{
                e.preventDefault()
                const message={
                    content: sendMessageForm.message.value,
                    owner: model.currentUser.email,
                    createdAt: new Date().toISOString()
                }
                // const botMsg={
                //     content: sendMessageForm.message.value,
                //     owner: 'Bot'
                // }
                // khi nguoi dung khong dien hoac dien toan dau cach thi khong gui duoc
                if(message.content.trim() != ''){
                    model.addMessage(message)
                    // view.addMessage(botMsg)
                    // const documentIdUpdate='j8BiExiYwBuruWKkyHpU'
                    // const messageToAdd={
                    //     messages: firebase.firestore.FieldValue.arrayUnion(message)
                    //   }
                    //   firebase.firestore().collection('conversations').doc(documentIdUpdate).update(messageToAdd)

                }
                sendMessageForm.message.value=''
                //console.log(sendMessageForm.message.value);
            })
            model.loadConversations();
            model.listenConversationsChange();
    }
}

view.addMessage=(message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message-container')
    if(message.owner === model.currentUser.email){
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML=`
        <div class="content">
        ${message.content}
        </div>
        `
    } else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML=`
        <div class="owner">
            ${message.owner}
        </div>
        <div class="content">
            ${message.content}
        </div>
        `

    }
    document.querySelector('.list-message').appendChild(messageWrapper)
}

view.showCurrentConversation=()=>{
    // doi ten cuoc tro chuyen
document.getElementsByClassName('conversation-header')[0].innerText=model.currentConversation.title
    for(message of model.currentConversation.messages){
        view.addMessage(message)
    }
    view.scrollToEndElement()
    // in cac tin nahn len man hinh

}
view.scrollToEndElement = () =>{
    const element = document.querySelector('.list-message')
    element.scrollTop=element.scrollHeight
}