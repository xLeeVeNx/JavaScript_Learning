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

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = undefined;
  this.moneyDeposit = undefined;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
};

AppData.prototype.start = function () {
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

  this.reset = this.reset.bind(this);
  resetBtn.addEventListener('click', this.reset);
};

AppData.prototype.reset = function () {
  this.unlockItems();
  this.cleanInputs();
  this.deleteAddInputs();
  this.unCheckbox();

  resetBtn.style.display = 'none';
  calculateBtn.style.display = 'block';

  this.notAllowClick();
};

AppData.prototype.lockItems = function () {
  dataInputs.forEach((item) => {
    this.setDisabled(item);
  });

  const expensesItem = document.querySelectorAll('.expenses .expenses-items input');
  expensesItem.forEach(item => {
    this.setDisabled(item);
  });

  const incomeItem = document.querySelectorAll('.income .income-items input');
  incomeItem.forEach(item => {
    this.setDisabled(item);
  });

  this.setDisabled(addExpensesBtn)
  this.setDisabled(addIncomeBtn);
  this.setDisabled(depositCheck);
};

AppData.prototype.unlockItems = function () {
  dataInputs.forEach(item => {
    this.unsetDisabled(item);
  });

  this.unsetDisabled(addExpensesBtn);
  this.unsetDisabled(addIncomeBtn);
  this.unsetDisabled(depositCheck);
};

AppData.prototype.cleanInputs = function () {
  period.value = 1;
  periodAmount.textContent = 1;

  dataInputs.forEach(item => {
    item.value = '';
  });

  resultInputs.forEach(item => {
    item.value = '';
  });
};

AppData.prototype.deleteAddInputs = function () {
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
};

AppData.prototype.unCheckbox = function () {
  if (depositCheck.checked) depositCheck.checked = false;
};

AppData.prototype.setDisabled = function (element) {
  element.setAttribute('disabled', 'disabled');
};

AppData.prototype.unsetDisabled = function (element) {
  element.removeAttribute('disabled');
};

AppData.prototype.showResults = function () {
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
};

AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItems = expensesItems[0].cloneNode(true);

  this.resetExpensesInputs(cloneExpensesItems);

  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpensesBtn);
  expensesItems = document.querySelectorAll('.expenses-items');

  this.checkExpensesInputs();

  if (expensesItems.length > 9) {
    addExpensesBtn.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function () {
  const cloneIncomeItems = incomeItems[0].cloneNode(true);

  this.resetIncomeInputs(cloneIncomeItems);

  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeBtn);
  incomeItems = document.querySelectorAll('.income-items');

  this.checkIncomeInputs();

  if (incomeItems.length > 2) {
    addIncomeBtn.style.display = 'none';
  }
};

AppData.prototype.resetExpensesInputs = function (cloneExpensesItems) {
  const cloneExpensesInputs = cloneExpensesItems.querySelectorAll('input');

  cloneExpensesInputs.forEach((item) => {
    item.value = '';
  });
};

AppData.prototype.resetIncomeInputs = function (cloneIncomeItems) {
  const cloneIncomeInputs = cloneIncomeItems.querySelectorAll('input');

  cloneIncomeInputs.forEach((item) => {
    item.value = '';
  });
};

AppData.prototype.getExpenses = function () {
  expensesItems.forEach((item) => {
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses && cashExpenses) {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function () {
  incomeItems.forEach((item) => {
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome && cashIncome) {
      this.income[itemIncome] = cashIncome;
    }
  });
};

AppData.prototype.checkExpensesInputs = function () {
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
};

AppData.prototype.checkIncomeInputs = function () {
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
};

AppData.prototype.getAddExpenses = function () {
  const addExpensesBlock = addExpensesItem.value.split(',');
  addExpensesBlock.forEach((item) => {
    item = item.trim();
    if (item) {
      this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  addIncomeItems.forEach((item) => {
    const value = item.value.trim();
    if (value) {
      this.addIncome.push(value);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};

AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.checkTarget = function () {
  targetAmount.value = targetAmount.value.replace(/[^0-9]/g, '');
};

AppData.prototype.getStatusIncome = function (budgetDay) {
  if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
  if (budgetDay >= 600 && budgetDay < 1200)
    return 'У вас средний уровень дохода';
  if (budgetDay < 600 && budgetDay >= 0)
    return 'К сожалению у вас уровень дохода ниже среднего';
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    while (!isNumber(this.percentDeposit)) {
      this.percentDeposit = prompt('Какой у Вас годовой процент?');
    }

    while (!isNumber(this.moneyDeposit)) {
      this.moneyDeposit = prompt('Какая сумма лежит на депозите?');
    }
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * period.value;
};

AppData.prototype.changePeriod = function () {
  periodAmount.innerHTML = period.value;
};

AppData.prototype.notAllowClick = function () {
  calculateBtn.setAttribute('disabled', 'disabled');
  calculateBtn.style.cursor = 'not-allowed';
};

AppData.prototype.allowClick = function () {
  if (isNumber(salaryAmount.value)) {
    calculateBtn.removeAttribute('disabled');
    calculateBtn.style.cursor = 'pointer';
  } else {
    this.notAllowClick();
  }
};

AppData.prototype.eventListeners = function () {
  this.allowClick = this.allowClick.bind(this);
  salaryAmount.addEventListener('input', this.allowClick);

  this.start = this.start.bind(this);
  calculateBtn.addEventListener('click', this.start);

  this.addExpensesBlock = this.addExpensesBlock.bind(this);
  addExpensesBtn.addEventListener('click', this.addExpensesBlock);

  this.addIncomeBlock = this.addIncomeBlock.bind(this);
  addIncomeBtn.addEventListener('click', this.addIncomeBlock);

  period.addEventListener('input', this.changePeriod);
  expensesTitle.addEventListener('input', this.checkExpensesInputs);
  expensesAmount.addEventListener('input', this.checkExpensesInputs);
  incomeTitle.addEventListener('input', this.checkIncomeInputs);
  incomeAmount.addEventListener('input', this.checkIncomeInputs);
  targetAmount.addEventListener('input', this.checkTarget);
};

const appData = new AppData();

appData.notAllowClick();
appData.eventListeners();
