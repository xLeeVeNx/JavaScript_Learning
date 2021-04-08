'use strict';

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Объявление ключевых переменных
const mission   = 7000000;
let money;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit     = confirm('Есть ли у вас депозит в банке?');

const start = () => {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
};
start();

//TypeOf переменных
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(deposit);

function showTypeOf(elem) {
  console.log(typeof elem);
}

//Обязательные рассходы
let amount1, amount2;

const getExpensesMonth = () => {
  while (!isNumber(amount1)) {
    amount1 = prompt('Во сколько это обойдется? #1');
  }
  while (!isNumber(amount2)) {
    amount2 = prompt('Во сколько это обойдется? #2');
  }

  return +amount1 + +amount2;
};
getExpensesMonth();

console.log('Обязательные расходы за месяц: ', getExpensesMonth());

//Возможные рассходы
console.log(addExpenses);

let accumulatedMonth = getAccumulatedMonth(); 
function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

//Срок достижения цели
const getTargetMonth = () => {
  let result = mission / accumulatedMonth;

  if (!isNumber(result) || result <= 0) return console.log('Цель не будет достигнута');
  if (result > 0)  return console.log('Цель будет достигнута за ' + Math.floor(result) + ' месяцев');
};
getTargetMonth();

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