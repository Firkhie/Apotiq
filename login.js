// SCRIPT LOGIN
// ------------
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', function(event) {
   event.preventDefault();

   const username = usernameInput.value;
   const password = passwordInput.value;
   let check = false;

   for (let user of userArr) {
      let { name, pass } = user;
      if (name === username && pass === password) {
         localStorage.setItem('user', JSON.stringify(user));
         window.location.href = 'home.html';
         check = true;
      }
   }
   if (!check) {
      alert('Username atau password salah!');
   }
})