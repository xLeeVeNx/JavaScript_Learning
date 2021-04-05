'use strict';

let money       = 500000;
let income      = 'Бизнес, Фриланс';
let addExpenses = 'Питание, Проживание, Проезд, Одежда, Комуналка';
let deposit     = true;
const mission   = 7000000;
const period    = 12;

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );

console.log('Длина строки addExpenses: ', addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log( addExpenses.toLowerCase().split(', ') );

let budgetDay = money / 30;  
console.log('budgetDay: ', budgetDay);

money       = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit     = confirm('Есть ли у вас депозит в банке?');

let expenses1   = prompt('Введите обязательную статью расходов?'); 
let expenses2   = prompt('Введите обязательную статью расходов?'); 
let amount1     = +prompt('Во сколько это обойдется?');
let amount2     = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2); 
console.log('budgetMonth: ', budgetMonth);

console.log('Цель будет достигнута за ', Math.ceil(mission / budgetMonth) + ' месяцев');

budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
if ((budgetDay >= 600) && (budgetDay < 1200)) console.log('У вас средний уровень дохода');
if ((budgetDay < 600) && (budgetDay >= 0)) console.log('К сожалению у вас уровень дохода ниже среднего');