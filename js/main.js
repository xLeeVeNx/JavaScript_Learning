const books          = document.querySelectorAll('.book');
const bookTitle      = document.querySelectorAll('h2>a')[4];
const advertising    = document.querySelector('.adv');
const listTwo        = document.querySelectorAll('ul')[0];
const listTwoItems   = listTwo.querySelectorAll('li');
const listFive       = document.querySelectorAll('ul')[5];
const listFiveItems  = listFive.querySelectorAll('li');
const listSix        = document.querySelectorAll('ul')[2];

books[1].after(books[0]);
books[2].before(books[4]);
books[5].before(books[2]);
books[3].after(books[5]);

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";
bookTitle.innerHTML = 'Книга 3. this и Прототипы Объектов';
advertising.remove();

listTwoItems[3].after(listTwoItems[6]);
listTwoItems[4].before(listTwoItems[8]);

listFiveItems[2].before(listFiveItems[9]);
listFiveItems[9].after(listFiveItems[3]);
listFiveItems[4].after(listFiveItems[2]);
listFiveItems[6].after(listFiveItems[5]);
listFiveItems[7].after(listFiveItems[5]);

const listSixItem = '<li>Глава 8: За пределами ES6</li>';
listSix.insertAdjacentHTML('beforeend', listSixItem);
listSix.querySelectorAll('li')[10].after(listSix.querySelectorAll('li')[9]);

