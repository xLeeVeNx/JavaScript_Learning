'use strict';

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//Объявление ключевых переменных
let money;
const start = () => {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 7000000,
  period: 2,

  asking: () => {
    let addExpenses     = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit     = confirm('Есть ли у вас депозит в банке?');

    let amount1, amount2;
    let expenses1, expenses2;

    while ( !isNumber(amount1) ) {
      expenses1 = prompt('Перечислите обязательные расходы за месяц: №1');
      amount1 = prompt('Во сколько это обойдется? #1');
      
      appData.expenses[expenses1] = +amount1;
    }

    while ( !isNumber(amount2) ) {
      expenses2 = prompt('Перечислите обязательные расходы за месяц: №2');
      amount2   = prompt('Во сколько это обойдется? #2');

      appData.expenses[expenses2] = +amount2;
    }
  },

  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay   = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: () => {
    let result = appData.mission / appData.budgetMonth;

    if ( !isNumber(result) || result <= 0 ) return 'Цель не будет достигнута';
    if (result > 0) return 'Цель будет достигнута за ' + Math.floor(result) + ' месяцев';
  },

  getStatusIncome: (budgetDay) => {
    if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
    if (budgetDay >= 600 && budgetDay < 1200)
      return 'У вас средний уровень дохода';
    if (budgetDay < 600 && budgetDay >= 0)
      return 'К сожалению у вас уровень дохода ниже среднего';
  },
};

appData.asking();

//Обязательные расходы за месяц
console.log('Список обязательных расходов за месяц:');
console.log(appData.expenses);

appData.getExpensesMonth();
console.log('Общая стоимость обязательных расходов: ' + appData.expensesMonth + ' рублей');

//Высчитываем бюджет
appData.getBudget();

//Срок достижения цели
console.log(appData.getTargetMonth());

//Определение статуса зарплаты
console.log(appData.getStatusIncome(appData.budgetDay));

//Содержание программы
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}