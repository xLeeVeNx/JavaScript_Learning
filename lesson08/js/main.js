'use strict';

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = (str) => {
  if (str !== null && str.trim() !== '' && isNaN(Number(str))) return true;
  else return false;
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
  percentDeposit: undefined,
  moneyDeposit: undefined,
  mission: 7000000,
  period: 2,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: () => {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = '';
      let cashIncome;

      while (!isString(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      }
      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
      }

      appData.income[itemIncome] = cashIncome;
    }

    let strAddExpenses = '';
    while ( !isString(strAddExpenses) ) {
      strAddExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    }

    const addExpenses = strAddExpenses.split(',');
    appData.addExpenses = addExpenses.map(current => {
      let item = current.replace(/\s+/g, ' ').trim().toLowerCase();
      return item[0].toUpperCase() + item.slice(1);
    });

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let amount1, amount2;
    let expenses1 = '', expenses2 = '';

    while (!isString(expenses1)) {
      expenses1 = prompt('Перечислите обязательные расходы за месяц: №1');
    }
    while (!isNumber(amount1)) {
      amount1 = prompt('Во сколько это обойдется? #1');
    }
    appData.expenses[expenses1] = +amount1;

    while (!isString(expenses2)) {
      expenses2 = prompt('Перечислите обязательные расходы за месяц: №2');
    }
    while (!isNumber(amount2)) {
      amount2 = prompt('Во сколько это обойдется? #2');
    }
    appData.expenses[expenses2] = +amount2;
  },

  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: () => {
    let result = appData.mission / appData.budgetMonth;

    if (!isNumber(result) || result <= 0) return 'Цель не будет достигнута';
    if (result > 0) return 'Цель будет достигнута за ' + Math.floor(result) + ' месяцев';
  },

  getStatusIncome: (budgetDay) => {
    if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
    if (budgetDay >= 600 && budgetDay < 1200)
      return 'У вас средний уровень дохода';
    if (budgetDay < 600 && budgetDay >= 0)
      return 'К сожалению у вас уровень дохода ниже среднего';
  },

  getInfoDeposit: () => {
    if (appData.deposit) {
      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = prompt('Какой у Вас годовой процент?');
      }

      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма лежит на депозите?');
      }
    }
  },

  calcSavedMoney: () => {
    return appData.budgetMonth * appData.period;
  }
};

//Спрашивает информацию у пользователя
appData.asking();
appData.getInfoDeposit();
//Обязательные расходы за месяц
appData.getExpensesMonth();
//Высчитываем бюджет
appData.getBudget();

console.log('Список обязательных расходов за месяц:');
console.log(appData.expenses);

console.log('Общая стоимость обязательных расходов: ' + appData.expensesMonth + ' рублей');

//Срок достижения цели
console.log(appData.getTargetMonth());

//Определение статуса зарплаты
console.log(appData.getStatusIncome(appData.budgetDay));

//Содержание программы
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}

console.log(appData.addExpenses.join(', '));