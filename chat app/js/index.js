
const init =()=>{
    console.log('Window loaded');
   view.setActiveScreen('registerScreen');
   
}
window.onload=init;
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
