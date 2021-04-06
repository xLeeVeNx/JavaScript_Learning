'use strict';

//Объявление ключевых переменных
const mission   = 7000000;

let money       = +prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit     = confirm('Есть ли у вас депозит в банке?');

//TypeOf переменных
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);

function showTypeOf(elem) {
  console.log(typeof elem);
}

//Обязательные рассходы
let amount1     = +prompt('Во сколько это обойдется?');
let amount2     = +prompt('Во сколько это обойдется?');

console.log('Обязательные расходы за месяц: ', getExpensesMonth());

function getExpensesMonth() {
  return amount1 + amount2;
}

//Возможные рассходы
console.log(addExpenses);

let accumulatedMonth = getAccumulatedMonth(); 
function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

//Срок достижения цели
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев');

function getTargetMonth() {
  return mission / accumulatedMonth;
}

//Бюджет на день
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log("budgetDay: ", budgetDay);

//Определение статуса зарплаты
function getStatusIncome(budgetDay) {
  if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
  if ((budgetDay >= 600) && (budgetDay < 1200)) return 'У вас средний уровень дохода';
  if ((budgetDay < 600) && (budgetDay >= 0)) return 'К сожалению у вас уровень дохода ниже среднего';
}
console.log(getStatusIncome(budgetDay));