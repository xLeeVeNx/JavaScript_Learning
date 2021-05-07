'use strict';

const months = [
  'января',
  'февраля',
  'марта',
  'апрель',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

// Main functions
const fullNameCheck = (fullName, arr) => {
  while (arr.length !== 2) {
    alert('Введены неккоректные данные!');
    fullName   = prompt('Введите Ваше имя и фамилию через пробел:');
    arr = fullName ? fullName.split(' ') : ''; 
  }
};

const addUser = (fullName, login, password) => {
  const date = new Date();
  const user = {};

  user.firstName = fullName.split(' ')[0];
  user.lastName  = fullName.split(' ')[1];
  user.login     = login;
  user.password  = password;
  user.regDate   = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г., ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return user;
};

const createElement = user => {
  const span = document.createElement('span');
  span.classList.add('close');

  const li = document.createElement('li');
  li.textContent = `Имя: ${user.firstName}, фамилия: ${user.lastName}, зарегистрирован: ${user.regDate}`;
  li.dataset.regDate = user.regDate;

  li.appendChild(span);

  return li;
};

// Main DOM-elements
const usersList = document.getElementById('users-list');

const userName  = document.getElementById('user-name');
userName.textContent = localStorage.getItem('userName') || userName.textContent;

const signInBtn = document.getElementById('signIn');
const signUpBtn = document.getElementById('signUp');

// Main code
const users  = JSON.parse(localStorage.getItem('users')) || [];

if (users.length) {
  users.forEach( item => {
    const li = createElement(item);
    usersList.appendChild(li);
  });
}

const closeBtns = document.querySelectorAll('.close');

document.body.addEventListener('click', event => {
  const target = event.target;
  
  if (target.closest('#signUp')) {
    let fullName    = prompt('Введите Ваше имя и фамилию через пробел:');
    let arrFullName = fullName ? fullName.split(' ') : ''; 

    fullNameCheck(fullName, arrFullName);
    
    const login    = prompt('Введите Ваш логин:');
    const password = prompt('Введите Ваш Пароль:');

    const user = addUser(fullName, login, password);
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    const li = createElement(user);
    usersList.appendChild(li);
  } else if (target.closest('.close')) {
    users.forEach( (item, index) => {
      if (item.regDate === target.parentNode.dataset.regDate) {
        users.splice(index, 1);
        target.parentNode.remove();

        localStorage.setItem('users', JSON.stringify(users));
        if (!users.length) {
          userName.textContent = `Привет, Аноним`;
          localStorage.setItem('userName', userName.textContent);
        }
      }
    });
  } else if (target.closest('#signIn')) {
    const auth = () => {
      if (users.length) {
        const authLogin = prompt('Введите Ваш логин:');
        for (let elem of users) {
          if (elem.login === authLogin) {
            const authPass = prompt('Введите Ваш пароль:');

            if (elem.password === authPass) {
              userName.textContent = `Привет, ${elem.firstName}`;
              localStorage.setItem('userName', userName.textContent);
              return;
            } else {
              alert('Неверный пароль!');
              return;
            }
          }
        }
        if (authLogin) {
          alert(`Пользователь с логином ${authLogin} не найден!`);
        } else {
          return;
        }
      } else {
        alert('В базе нет зарегистрированных пользователей!');
      }
    };

    auth();
  }
});