'use strict';

// Задача №1.
let lang = prompt('Введите язык (ru, en)');

/* С помощью if (a)
if (lang === 'ru') {
  alert('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'); 
} else if (lang === 'en') {
  alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
  alert('Обновите страницу и повторите ввод языка!');
} 
*/

/* С помощью switch-case (b)
switch (lang) {
  case 'ru':
    alert('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'); 
    break;
  case 'en':
    alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
  default:
    alert('Обновите страницу и повторите ввод языка!');
    break;
}
*/

// С помощью многомерного массива
let daysArray = [];
daysArray['ru'] = ['Понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
daysArray['en'] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

alert( daysArray[lang] );

// Задача №2.
let namePerson = prompt('Введите Ваше имя:');

console.log( (namePerson === 'Артём') ? 'директор' : (namePerson === 'Максим') ? 'преподователь' : 'студент' );

