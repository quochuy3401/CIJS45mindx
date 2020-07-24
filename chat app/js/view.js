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
    }
}