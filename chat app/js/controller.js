const controller ={}
controller.register=(data)=>{
    document.getElementById('first-name-error').innerText='';
    document.getElementById('last-name-error').innerText='';
    document.getElementById('email-error').innerText='';
    document.getElementById('password-error').innerText='';
    document.getElementById('confirm-password-error').innerText='';
    if(data.firstName.trim()===''){
        document.getElementById('first-name-error').innerText='*Please input first name.'
    }
    if(data.lastName.trim()===''){
        document.getElementById('last-name-error').innerText='*Please input last name.'
    }
    if(data.email===''){
        document.getElementById('email-error').innerText='*Please input email.'
    }
    if(data.password.trim()===''){
        document.getElementById('password-error').innerText='*Please input password.'
    }
    if(data.confirmPassword.trim()===''){
        document.getElementById('confirm-password-error').innerText='*Please confirm password.'
    }
    if(data.password != data.confirmPassword && data.password.trim()!='' && data.confirmPassword.trim()!=''){
        document.getElementById('confirm-password-error').innerText="*Password didn't match."
    }
    if(data.firstName!='' && data.lastName!='' && data.email!='' && data.password!='' && data.confirmPassword!='' && data.password===data.confirmPassword){
        model.register(data);
    }
};

controller.login=(dataLogin) =>{
    document.getElementById('email-error').innerText='';
    document.getElementById('password-error').innerText='';
    if(dataLogin.email===''){
        document.getElementById('email-error').innerText='*Please input email.'
    }
    if(dataLogin.password===''){
        document.getElementById('password-error').innerText='*Please input password.'
    }
    if(dataLogin.email != ''&& dataLogin.password!= ''){
        model.login(dataLogin)
    }
}

controller.createConversation=(dataCreate) =>{
    document.getElementById('conversation-name-error').innerText=''
    document.getElementById('conversation-email-error').innerText=''
    if(dataCreate.title.trim() === ''){
        document.getElementById('conversation-name-error').innerText='*Please input name of conversation.'
    }
    if(dataCreate.email.trim()===''){
        document.getElementById('conversation-email-error').innerText='*Please input email.'
    }
    if(dataCreate.title!='' && dataCreate.email!=''){
        model.createConversation(dataCreate)
    }
}

controller.addUser=(friendEmail) => {
    document.getElementById('add-user-email-error').innerText=''
    if(friendEmail.trim()===''){
        document.getElementById('add-user-email-error').innerText='Please input friend email.' 
    }
    if(friendEmail!=''){
        model.addUser(friendEmail)
    }
}