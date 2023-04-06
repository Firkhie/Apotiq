// IMPORT PASSWORD GEN FUNCTION
import { passwordGenerator } from "./passGen.js"; 


// SCRIPT LOGIN
// ------------

if (localStorage.getItem("user")) {
  window.location.href = "/main/home.html";
}

const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', function(event) {
   event.preventDefault();

   const username = usernameInput.value;
   const password = passwordInput.value;
   let check = false;

   for (let user of userArr) {
     let { name, pass, saldo } = user;
     const passEncoded = passwordGenerator(password)
      if (name === username && passEncoded === pass) {
         localStorage.setItem('user', JSON.stringify({name,saldo}));
         window.location.href = '../../main/home.html';
         check = true;
      }
   }
   if (!check) {
      alert('Username atau password salah!');
   }
})

