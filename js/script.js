'use strict';

(function() {
  var popup = document.querySelector('.page-main__popup');
  var loginForm = popup.querySelector('.page-main__login');
  var login = popup.querySelector('.page-main__login input[type="text"]');
    
  if (localStorage.login) {
    login.value = localStorage.login;
  }

  loginForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if (login.value) {
      localStorage.setItem('login', login.value);
      document.location.href = "chat.html";
    }

  })
})();
