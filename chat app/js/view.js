const view={};
    view.setActiveScreen=(screenName, fromCreateConversation=false)=>{
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
            if(!fromCreateConversation){
                model.loadConversations();
                model.listenConversationsChange();
            } else{
                view.showConversations()
                view.showCurrentConversation()
            }
            document.querySelector('.create-conversation .btn').addEventListener('click', ()=>{
                view.setActiveScreen('createConversation')
            })
            const addUserForm= document.getElementById('add-user-form')
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const friendEmail= addUserForm.mail.value
                controller.addUser(friendEmail)
                addUserForm.mail.value=''
            })
            break;
        case 'createConversation':
                document.getElementById('app').innerHTML=components.createConversation
                document.querySelector('#back-to-chat').addEventListener('click', () =>{
                    view.setActiveScreen('chatScreen', true)
                })
                const createConversationForm=document.getElementById('create-conversation-form')
                createConversationForm.addEventListener('submit', (e)=>{
                    e.preventDefault()
                    const dataCreate ={
                        title : createConversationForm.conversationTitle.value,
                        email : createConversationForm.conversationEmail.value
                    }
                    controller.createConversation(dataCreate)
                    if(dataCreate.title.trim()!= '' && dataCreate.email.trim()!=''){
                        view.setActiveScreen('chatScreen', true)
                    }
                })    
                
            break;
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
    document.querySelector('.list-message').innerHTML=''
    // doi ten cuoc tro chuyen
document.getElementsByClassName('conversation-header')[0].innerText=model.currentConversation.title
    for(message of model.currentConversation.messages){
        view.addMessage(message)
    }
    view.scrollToEndElement()
    view.showListUser(model.currentConversation.users)
    // in cac tin nahn len man hinh

}

view.showListUser=(users)=>{
    document.querySelector('.list-user').innerText=""
    for(user of users){
        view.addUser(user)
    }
}
view.addUser=(user)=>{
    const userWrapper = document.createElement('div')
    userWrapper.classList.add('user')
    userWrapper.innerText= user
    document.querySelector('.list-user').appendChild(userWrapper)
}
view.scrollToEndElement = () =>{
    const element = document.querySelector('.list-message')
    element.scrollTop=element.scrollHeight
}

view.showConversations =() =>{
    for(oneConversation of model.conversations){
        view.addConversation(oneConversation)
    }
}

view.addConversation=(conversation)=>{
    const conversationWrapper = document.createElement('div')
    conversationWrapper.className=' conversation cursor-pointer'
    if(model.currentConversation.id === conversation.id){
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML=`
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length} users</div>
    `
    conversationWrapper.addEventListener('click', () => {
        //thay doi giao dien, doi current
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        // thay doi model.currentConversation
        for(oneConversation of model.conversations){
            if(oneConversation.id ===conversation.id){
                model.currentConversation=oneConversation

            }
        }
        //in cac tin nhan cua model.currentConversation len man hinh
        view.showCurrentConversation()
    })
    document.querySelector('.list-conversations').appendChild(conversationWrapper)
}
