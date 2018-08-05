'use strict';

(function () {
  if (!localStorage.getItem('login')) {
    document.location.href = "index.html";
  }

  var template = document.querySelector('template');
  var fragment = document.createDocumentFragment();
  var form = document.querySelector('.chat-footer__add-message');
  var input = form.querySelector('.chat-footer__add-message input');
  var message = form.querySelector('input[type="text"]');
  var chat = document.querySelector('.chat-main__messages');  
  var header = document.querySelector('.chat-main__header p');
  var numberMessage = 0;
  
  header.innerText = localStorage.getItem('login');
  
  function getMessages() {    
    fetch("php/action.php", {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
        .then(function(data) {

          if (data.length !== numberMessage) {
            chat.innerHTML = "";
            data.forEach(function(item, i) {
              var element = template.content.cloneNode(true);
              var text= element.querySelector('.chat-main__text');
              if (item.author === localStorage.getItem('login')) {
                element.children[0].classList.add('chat-main__message--sent');
              } else {
                element.children[0].classList.add('chat-main__message--received');
              }

              text.innerText = item.text;
              var author= element.querySelector('.chat-main__author');
              author.innerText = item.author;
              fragment.appendChild(element);
              chat.appendChild(fragment);

            });
            numberMessage = data.length;
            chat.scrollTop = 9999;  
          }
          
                  
        });
  }
  getMessages();

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    var form = new FormData(document.querySelector('.chat-footer__add-message'));
    form.append("author", localStorage.getItem('login'));
    
    fetch("php/action.php", {
      method: "POST",
      body: form
    })
      .then(function(response) {
        return response.json();
      })
        .then(function(data) {
          data.forEach(function(item, i) {
            var element = template.content.cloneNode(true);
            var text= element.querySelector('.chat-main__text');
            if (item.author === localStorage.getItem('login')) {
              element.children[0].classList.add('chat-main__message--sent');
            } else {
              element.children[0].classList.add('chat-main__message--received');
            }

            text.innerText = item.text;
          var author= element.querySelector('.chat-main__author');
            author.innerText = item.author;
            fragment.appendChild(element);
            chat.appendChild(fragment);

          }); 
          chat.scrollTop = 9999;    
                    
        });

    input.value = "";

    chat.innerHTML = "";
  });
  
  setInterval(getMessages, 1000);

})();
