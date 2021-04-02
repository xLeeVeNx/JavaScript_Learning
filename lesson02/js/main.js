let money       = 1500000;
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

const budgetDay = 40000;  
console.log('budgetDay: ', budgetDay);