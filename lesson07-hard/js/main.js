'use strict';

const week = [
  'Воскресенье',
  'Понедельник',
  'Вторник', 
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
];

week[0] = `<i>${week[0]}</i>`;
week[6] = `<i>${week[6]}</i>`;

const date = new Date();
let today = date.getDay();

week.forEach((element, index) => {
  if (index === today) element = `<b>${element}</b>`;
  document.body.insertAdjacentHTML("beforeend", `<div>${element}</div>`);
});
