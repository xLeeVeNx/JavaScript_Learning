'use strict';

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = (str) => {
  if (str !== null && str.trim() !== '' && isNaN(Number(str))) return true;
  else return false;
};

//Объявление ключевых переменных
const calculateBtn        = document.getElementById('start');
const addIncomeBtn        = document.getElementsByTagName('button')[0];
const addExpensesBtn      = document.getElementsByTagName('button')[1];
const depositCheck        = document.querySelector('#deposit-check');
const addIncomeItems      = document.querySelectorAll('.additional_income-item');
const budgetMonthValue    = document.querySelector('.budget_month-value');
const budgetDayValue      = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue  = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue      = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue    = document.getElementsByClassName('additional_expenses-value')[0];
const addExpensesItem     = document.querySelector('.additional_expenses-item');  
const incomePeriodValue   = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue    = document.getElementsByClassName('target_month-value')[0];
const salaryAmount        = document.querySelector('.salary-amount');
const incomeTitle         = document.querySelectorAll('.income-title')[1];
let   incomeItems         = document.querySelectorAll('.income-items');
const expensesTitle       = document.querySelectorAll('.expenses-title')[1];
let   expensesItems       = document.querySelectorAll('.expenses-items');
const addExpenses         = document.querySelector('.additional_expenses-item');
const targetAmount        = document.querySelector('.target-amount');
const periodAmount        = document.querySelector('.period-amount');
const period              = document.querySelector('.period-select');

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: undefined,
  moneyDeposit: undefined,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,

  start: () => {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResults();
  },

  showResults: () => {
    budgetMonthValue.value   = appData.budgetMonth;
    budgetDayValue.value     = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    addExpensesValue.value   = appData.addExpenses.join(', ');
    addIncomeValue.value     = appData.addIncome.join(', ');
    targetMonthValue.value   = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value  = appData.calcPeriod();

    period.addEventListener('input', () => {
      incomePeriodValue.value  = appData.calcPeriod();
    });
  },

  addExpensesBlock: () => {
    const cloneExpensesItems  = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 9) {
      addExpensesBtn.style.display = 'none';
    }
  },

  addIncomeBlock: () => {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeBtn);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 2) {
      addIncomeBtn.style.display = 'none';
    }
  },

  getExpenses: () => {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses && cashExpenses) {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: () => {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome && cashIncome) {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },

  getAddExpenses: () => {
    const addExpensesBlock = addExpensesItem.value.split(',');
    addExpensesBlock.forEach((item) => {
      item = item.trim();
      if (item) {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: () => {
    addIncomeItems.forEach((item)=> {
      const value = item.value.trim();
      if (value) {
        appData.addIncome.push(value);
      }
    });
  },

  getExpensesMonth: () => {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getIncomeMonth: () => {
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
      console.log(appData.incomeMonth);
    }
  },

  getBudget: () => {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: () => {
    return targetAmount.value / appData.budgetMonth;
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

  calcPeriod: () => {
    return appData.budgetMonth * period.value;
  },

  changePeriod: () => {
    periodAmount.innerHTML = period.value;
  },

  notAllowClick: () => {
    calculateBtn.setAttribute('disabled', 'disabled');
    calculateBtn.style.cursor = 'not-allowed';
  },

  allowClick: () => {
    if ( isNumber(salaryAmount.value) ) {
      calculateBtn.removeAttribute('disabled');
      calculateBtn.style.cursor = 'pointer';
    } else {
      appData.notAllowClick();
    }
  },
};

appData.notAllowClick();

salaryAmount.addEventListener('input', appData.allowClick);
calculateBtn.addEventListener('click', appData.start);
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addIncomeBtn.addEventListener('click', appData.addIncomeBlock);
period.addEventListener('input', appData.changePeriod);

