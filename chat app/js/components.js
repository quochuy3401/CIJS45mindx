const components={};
components.welcomeScreen=`
<h1>Welcome to Chat app</h1>
`;

components.registerScreen=`<div class="register-container">
<div class="aside-right">
    <div class="header">
        <h3>MindX chat</h3>
    </div>
    <div>
        <form id="register-form">
            <div class="input-name-wrapper">
                <div class="input-wrapper">
                    <input type="text" name="firstName" placeholder="First name...">
                    <div class="error" id="first-name-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="text" name="lastName" placeholder="Last name...">
                    <div class="error" id="last-name-error"></div>
                </div>
            </div>
            <div class="input-wrapper">
                <input type="email" name="email" placeholder="Email...">
                <div class="error" id="email-error"></div>
            </div>
            <div class="input-wrapper">
                <input type="password" name="password" placeholder="Password...">
                <div class="error" id="password-error"></div>
            </div>
            <div class="input-wrapper">
                <input type="password" name="confirmPassword"placeholder="Confirm password...">
                <div class="error" id="confirm-password-error"></div>
            </div>
            <div class="form-action">
                <span id="redirect-to-login" onclick='view.setActiveScreen("loginScreen")'> Already have an acount? Log in.</span>
                <button type="submit" class="btn">Register</button>
            </div>
        </form>
    </div>
</div>
</div>`
components.loginScreen=`<div class="login-container">
<div class="aside-right">
    <div class="header">
        <h3>MindX chat</h3>
    </div>
    <div>
        <form id="login-form">
            <div class="input-wrapper">
                <input type="email" name="email" placeholder="Email...">
                <div class="error" id="email-error"></div>
            </div>
            <div class="input-wrapper">
                <input type="password" name="password" placeholder="Password...">
                <div class="error" id="password-error"></div>
            </div>
            <div class="form-action">
                <span id="redirect-to-register" onclick='view.setActiveScreen("registerScreen")'> Don't have an acount? Register.</span>
                <button type="submit" class="btn">Login</button>
            </div>
        </form>
    </div>
</div>
</div>`
components.chatScreen = (displayName) => {
    return `<h1> Welcome ${displayName} </h1>`
}