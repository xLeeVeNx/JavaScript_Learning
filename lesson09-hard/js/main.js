'use strict';

const decNum = (value, array) => {
  value = Math.abs(value) % 100;
  let remainder = value % 10;

  if (value > 10 && value < 20) return array[2];
  if (remainder > 1 && remainder < 5) return array[1];
  if (remainder === 1) return array[0];

  return array[2];
};

const getZero = (num) => {
  if (num > 0 && num < 10) return '0' + num;
  else return num;
};

const days = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
];

const arrayMinutes = ['минута', 'минуты', 'минут'];
const arraySeconds = ['секунда', 'секунды', 'секунд'];
const arrayHours = ['час', 'часа', 'часов'];

document.body.insertAdjacentHTML('afterbegin', '<div class="first-format format"></div>');
document.querySelector('.first-format').insertAdjacentHTML('afterend', '<div class="second-format format"></div>');

document.querySelectorAll('.format').forEach(element => {
  element.style.color = 'red';
});

const time = () => {
  let date = new Date();
  const today = date.getDay();
  const number = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const firstFormat = document.querySelector('.first-format');
  firstFormat.innerHTML = `Сегодня ${days[today]}, ${number} ${months[month].toLowerCase()} ${year} года, ${hours} ${decNum(hours, arrayHours)} ${minutes} ${decNum(minutes, arrayMinutes)} ${seconds} ${decNum(seconds, arraySeconds)}`;

  const secondFormat = document.querySelector('.second-format');
  secondFormat.innerHTML = `${getZero(number)}.${getZero(month + 1)}.${year} - ${getZero(hours)}:${getZero(minutes)}:${getZero(seconds)}`;
};

time();

setInterval(() => {
  time();
}, 1000);

