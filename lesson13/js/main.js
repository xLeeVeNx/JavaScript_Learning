'use strict';

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = (str) => {
  if (str !== null && str.trim() !== '' && isNaN(Number(str))) return true;
  else return false;
};

//Объявление ключевых переменных
const calculateBtn = document.getElementById('start');
const resetBtn = document.getElementById('cancel');
const addIncomeBtn = document.getElementsByTagName('button')[0];
const addExpensesBtn = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const addIncomeItems = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const addExpensesItem = document.querySelector('.additional_expenses-item');
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelectorAll('.income-title')[1];
const incomeAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const addExpenses = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodAmount = document.querySelector('.period-amount');
const period = document.querySelector('.period-select');
const dataInputs = document.querySelectorAll('.data input[type="text"]');
const resultInputs = document.querySelectorAll('.result input[type="text"]');

const appData = {
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

  start: function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResults();

    this.lockItems();

    calculateBtn.style.display = 'none';
    resetBtn.style.display = 'block';

    appData.reset = appData.reset.bind(appData);
    resetBtn.addEventListener('click', this.reset);
  },

  reset: function () {
    this.unlockItems();
    this.cleanInputs();
    this.deleteAddInputs();
    this.unCheckbox();

    resetBtn.style.display = 'none';
    calculateBtn.style.display = 'block';

    this.notAllowClick();
  },

  lockItems: function () {
    dataInputs.forEach((item) => {
      appData.setDisabled(item);
    });

    const expensesItem = document.querySelectorAll('.expenses .expenses-items input');
    expensesItem.forEach(item => {
      appData.setDisabled(item);
    });

    const incomeItem = document.querySelectorAll('.income .income-items input');
    incomeItem.forEach(item => {
      appData.setDisabled(item);
    });

    appData.setDisabled(addExpensesBtn);
    appData.setDisabled(addIncomeBtn);
    appData.setDisabled(depositCheck);
  },

  unlockItems: function () {
    dataInputs.forEach(item => {
      appData.unsetDisabled(item);
    });

    appData.unsetDisabled(addExpensesBtn);
    appData.unsetDisabled(addIncomeBtn);
    appData.unsetDisabled(depositCheck);
  },

  cleanInputs: function () {
    period.value = 1;
    periodAmount.textContent = 1;
    
    dataInputs.forEach(item => {
      item.value = '';
    });

    resultInputs.forEach(item => {
      item.value = '';
    });
  },

  deleteAddInputs: function () {
    if (expensesItems.length > 1) {
      const expensesItem = expensesItems[0].cloneNode(true);
      this.resetExpensesInputs(expensesItem);

      expensesItems.forEach(item => {
        item.parentNode.removeChild(item);
      });

      addExpensesBtn.parentNode.insertBefore(expensesItem, addExpensesBtn);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (addExpensesBtn.hasAttribute('style')) {
        addExpensesBtn.style.display = 'block';
      }
    }

    if (incomeItems.length > 1) {
      const incomeItem = incomeItems[0].cloneNode(true);
      this.resetIncomeInputs(incomeItem);

      incomeItems.forEach(item => {
        item.parentNode.removeChild(item);
      });

      addIncomeBtn.parentNode.insertBefore(incomeItem, addIncomeBtn);
      incomeItems = document.querySelectorAll('.income-items');

      if (addIncomeBtn.hasAttribute('style')) {
        addIncomeBtn.style.display = 'block';
      }
    }
  },

  unCheckbox: function () {
    if (depositCheck.checked) depositCheck.checked = false;
  },

  setDisabled: function (element) {
    element.setAttribute('disabled', 'disabled');
  },

  unsetDisabled: function (element) {
    element.removeAttribute('disabled');
  },

  showResults: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    period.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  },

  addExpensesBlock: function () {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);

    this.resetExpensesInputs(cloneExpensesItems);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesBtn);
    expensesItems = document.querySelectorAll('.expenses-items');

    this.checkExpensesInputs();

    if (expensesItems.length > 9) {
      addExpensesBtn.style.display = 'none';
    }
  },

  addIncomeBlock: function () {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);

    this.resetIncomeInputs(cloneIncomeItems);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeBtn);
    incomeItems = document.querySelectorAll('.income-items');

    this.checkIncomeInputs();

    if (incomeItems.length > 2) {
      addIncomeBtn.style.display = 'none';
    }
  },

  resetExpensesInputs: function (cloneExpensesItems) {
    const cloneExpensesInputs = cloneExpensesItems.querySelectorAll('input');

    cloneExpensesInputs.forEach((item) => {
      item.value = '';
    });
  },

  resetIncomeInputs: function (cloneIncomeItems) {
    const cloneIncomeInputs = cloneIncomeItems.querySelectorAll('input');

    cloneIncomeInputs.forEach((item) => {
      item.value = '';
    });
  },

  getExpenses: function () {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses && cashExpenses) {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function () {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome && cashIncome) {
        this.income[itemIncome] = cashIncome;
      }
    });
  },

  checkExpensesInputs: function () {
    expensesItems.forEach((item) => {
      let expensesInputTitle = item.querySelector('.expenses-title');
      expensesInputTitle.addEventListener('input', () => {
        expensesInputTitle.value = expensesInputTitle.value.replace(/[^а-яА-Я\.\,\;]/, '');
      });

      let expensesInputCash = item.querySelector('.expenses-amount');
      expensesInputCash.addEventListener('input', () => {
        expensesInputCash.value = expensesInputCash.value.replace(/[^0-9]/g, '');
      });
    });
  },

  checkIncomeInputs: function () {
    incomeItems.forEach((item) => {
      let incomeInputTitle = item.querySelector('.income-title');
      incomeInputTitle.addEventListener('input', () => {
        incomeInputTitle.value = incomeInputTitle.value.replace(/[^а-яА-Я\.\,\;]/, '');
      });

      let incomeInputCash = item.querySelector('.income-amount');
      incomeInputCash.addEventListener('input', () => {
        incomeInputCash.value = incomeInputCash.value.replace(/[^0-9]/g, '');
      });
    });
  },

  getAddExpenses: function () {
    const addExpensesBlock = addExpensesItem.value.split(',');
    addExpensesBlock.forEach((item) => {
      item = item.trim();
      if (item) {
        this.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    addIncomeItems.forEach((item) => {
      const value = item.value.trim();
      if (value) {
        this.addIncome.push(value);
      }
    });
  },

  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
      console.log(this.incomeMonth);
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },

  checkTarget: function () {
    targetAmount.value = targetAmount.value.replace(/[^0-9]/g, '');
  },

  getStatusIncome: function (budgetDay) {
    if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
    if (budgetDay >= 600 && budgetDay < 1200)
      return 'У вас средний уровень дохода';
    if (budgetDay < 600 && budgetDay >= 0)
      return 'К сожалению у вас уровень дохода ниже среднего';
  },

  getInfoDeposit: function () {
    if (this.deposit) {
      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = prompt('Какой у Вас годовой процент?');
      }

      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt('Какая сумма лежит на депозите?');
      }
    }
  },

  calcPeriod: function () {
    return this.budgetMonth * period.value;
  },

  changePeriod: function () {
    periodAmount.innerHTML = period.value;
  },

  notAllowClick: function () {
    calculateBtn.setAttribute('disabled', 'disabled');
    calculateBtn.style.cursor = 'not-allowed';
  },

  allowClick: function () {
    if (isNumber(salaryAmount.value)) {
      calculateBtn.removeAttribute('disabled');
      calculateBtn.style.cursor = 'pointer';
    } else {
      this.notAllowClick();
    }
  },
};

appData.notAllowClick();

appData.allowClick = appData.allowClick.bind(appData);
salaryAmount.addEventListener('input', appData.allowClick);

appData.start = appData.start.bind(appData);
calculateBtn.addEventListener('click', appData.start);

appData.addExpensesBlock = appData.addExpensesBlock.bind(appData);
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);

appData.addIncomeBlock = appData.addIncomeBlock.bind(appData);
addIncomeBtn.addEventListener('click', appData.addIncomeBlock);

period.addEventListener('input', appData.changePeriod);
expensesTitle.addEventListener('input', appData.checkExpensesInputs);
expensesAmount.addEventListener('input', appData.checkExpensesInputs);
incomeTitle.addEventListener('input', appData.checkIncomeInputs);
incomeAmount.addEventListener('input', appData.checkIncomeInputs);
targetAmount.addEventListener('input', appData.checkTarget);