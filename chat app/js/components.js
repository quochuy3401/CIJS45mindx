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
// components.chatScreen = (displayName) => {
//     return `<h1> Welcome ${displayName} </h1>`
// }
components.chatScreen =`
<div class="chat-container">
        <div class="header">
            Mindx chat
        </div>
        <div class="main">
            <div class="aside-left">
                <div class="create-conversation">
                    <button class="btn">+ New conversation</button>
                </div>
                <div class="list-conversations">
                
                </div>
            </div>
            <div class="conversation-detail">
                <div class="conversation-header">
                    First conversation
                </div>
                <div class="list-message">
                    
                </div>
                <form id="send-message-form">
                    <div class="input-wrapper">
                        <input type="text" name="message" placeholder="Type a message">
                    </div>
                    <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        </div>
        </div>
`

components.createConversation=`
<div class="create-conversation-container">
<div class="header">
    Mindx chat
</div>
<div class="main" style="padding: 50px 20%;">
    <form id="create-conversation-form">
        <div>
            Create a new conversation
        </div>
        <div class="input-wrapper">
            <input type="text" placeholder="Conversation name" name="conversationTitle">
            <div class="error" id="conversation-name-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="email" placeholder="Friend email" name="conversationEmail">
            <div class="error" id="conversation-email-error"></div>
        </div>
        <button class="btn" type="submit">Save</button>
        <button class="btn btn-light" type="button" id="back-to-chat">Cancel</button>
    </form>
</div>
</div>
`
