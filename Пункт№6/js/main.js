'use strict';

const WeeksDay = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

let hours        = new Date().getHours();
let greeting     = '';
let today        = WeeksDay[new Date().getDay()];
let nowTime      = new Date().toLocaleTimeString('en');
let untilNewYear = Math.floor( (new Date('1 January 2022').getTime() - new Date()) / 1000 / 60 / 60 / 24 );

document.body.innerHTML = `
  <div>${greetingDef(greeting)}</div>
  <div>Сегодня: ${today}</div>
  <div>Текущее время: ${nowTime}</div>
  <div>До Нового года осталось ${untilNewYear} ${rightText()}</div>
`;

function greetingDef(greeting) {
  if ( (hours <= 11) && (hours >= 4) ) return greeting = 'Доброе утро';
  else if ( (hours >= 12) && (hours <= 17) ) return greeting = 'Добрый день';
  else if ( (hours >= 18) && (hours <= 23) ) return greeting = 'Добрый вечер';
  else return greeting = 'Доброй ночи';
}

function rightText() {
  let number = (untilNewYear + '');
  number = +number[number.length - 1];
  if (number === 1) return 'день';
  if ( (number >= 2) && (number <= 4) ) return 'дня';
  else return 'дней';
}