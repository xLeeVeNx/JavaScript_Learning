'use strict';

const isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = str => {
  if (str !== null && str.trim() !== '' && isNaN(Number(str))) return true;
  else return false;
};

//Объявление ключевых переменных
const calculateBtn = document.getElementById('start');
const resetBtn = document.getElementById('cancel');
const addIncomeBtn = document.getElementsByTagName('button')[0];
const addExpensesBtn = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addIncomeItems = document.querySelectorAll('.additional_income-item');
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
console.log(dataInputs);

class AppData {
  constructor() {
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
  }

  start() {
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getAddExpInc();
    this.getExpIncMonth();
    this.getBudget();
    this.showResults();

    this.lockItems();

    calculateBtn.style.display = 'none';
    resetBtn.style.display = 'block';

    this.reset = this.reset.bind(this);
    resetBtn.addEventListener('click', this.reset);
  }

  reset() {
    this.unlockItems();
    this.cleanInputs();
    this.deleteAddInputs();
    this.unCheckbox();

    resetBtn.style.display = 'none';
    calculateBtn.style.display = 'block';

    this.notAllowClick();
  }

  lockItems() {
    dataInputs.forEach(item => {
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

    this.setDisabled(addExpensesBtn);
    this.setDisabled(addIncomeBtn);
    this.setDisabled(depositCheck);
  }

  unlockItems() {
    dataInputs.forEach(item => {
      this.unsetDisabled(item);
    });

    const expensesItem = document.querySelectorAll('.expenses .expenses-items input');
    expensesItem.forEach(item => {
      this.unsetDisabled(item);
    });

    const incomeItem = document.querySelectorAll('.income .income-items input');
    incomeItem.forEach(item => {
      this.unsetDisabled(item);
    });

    this.unsetDisabled(addExpensesBtn);
    this.unsetDisabled(addIncomeBtn);
    this.unsetDisabled(depositCheck);
  }

  cleanInputs() {
    period.value = 1;
    periodAmount.textContent = 1;

    dataInputs.forEach(item => {
      item.value = '';
    });

    resultInputs.forEach(item => {
      item.value = '';
    });
  }

  deleteAddInputs() {
    if (expensesItems.length > 1) {
      const expensesItem = expensesItems[0].cloneNode(true);
      this.resetInputs(expensesItem);

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
      this.resetInputs(incomeItem);

      incomeItems.forEach(item => {
        item.parentNode.removeChild(item);
      });

      addIncomeBtn.parentNode.insertBefore(incomeItem, addIncomeBtn);
      incomeItems = document.querySelectorAll('.income-items');

      if (addIncomeBtn.hasAttribute('style')) {
        addIncomeBtn.style.display = 'block';
      }
    }
  }

  unCheckbox() {
    if (depositCheck.checked) depositCheck.checked = false;
  }

  setDisabled(element) {
    element.setAttribute('disabled', 'disabled');
  }

  unsetDisabled(element) {
    element.removeAttribute('disabled');
  }

  showResults() {
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
  }

  addExpIncBlock(element) {
    const pushButton = element.srcElement;
    const startStr = pushButton.previousElementSibling.className.split('-')[0];
    let items = document.querySelectorAll(`.${startStr}-items`);
    const cloneItems = items[0].cloneNode(true);

    this.resetInputs(cloneItems);

    items[0].parentNode.insertBefore(cloneItems, pushButton);
    items = document.querySelectorAll(`.${startStr}-items`);

    this.checkInputs(items);

    if ((items[0].className.split('-')[0] === 'expenses' && items.length > 9) ||
      (items[0].className.split('-')[0] === 'income' && items.length > 2)) {
      pushButton.style.display = 'none';
    }
  }

  resetInputs(elements) {
    if (elements) {
      const cloneElements = elements.querySelectorAll('input');

      cloneElements.forEach(item => {
        item.value = '';
      });
    }
  }

  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];

      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle && itemAmount) {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');

    expensesItems.forEach(count);
    incomeItems.forEach(count);
  }

  checkInputs(items) {
    const inputs = [...items];
    Array.prototype.forEach.call(inputs, item => {
      const startStr = item.className.split('-')[0];

      const inputTitle = item.querySelector(`.${startStr}-title`);
      const inputAmount = item.querySelector(`.${startStr}-amount`);

      inputTitle.addEventListener('input', () => {
        inputTitle.value = inputTitle.value.replace(/[^а-яА-Я\.\,\;]/, '');
      });

      inputAmount.addEventListener('input', () => {
        inputAmount.value = inputAmount.value.replace(/[^0-9]/g, '');
      });
    });
  }

  getAddExpInc() {
    if (addIncomeItems[0].value.trim() || addIncomeItems[1].value.trim()) {
      addIncomeItems.forEach((item) => {
        item.value = item.value.trim();
        this.addIncome.push(item.value);
      });
    }

    if (addExpensesItem.value.trim()) {
      const addExpensesBlock = addExpensesItem.value.split(',');
      addExpensesBlock.forEach(item => {
        item = item.trim();
        this.addExpenses.push(item);
      });
    }
  }

  getExpIncMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  checkTarget() {
    targetAmount.value = targetAmount.value.replace(/[^0-9]/g, '');
  }

  getStatusIncome(budgetDay) {
    if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
    if (budgetDay >= 600 && budgetDay < 1200)
      return 'У вас средний уровень дохода';
    if (budgetDay < 600 && budgetDay >= 0)
      return 'К сожалению у вас уровень дохода ниже среднего';
  }

  getInfoDeposit() {
    if (this.deposit) {
      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = prompt('Какой у Вас годовой процент?');
      }

      while (!isNumber(this.moneyDeposit)) {
        this.moneyDeposit = prompt('Какая сумма лежит на депозите?');
      }
    }
  }

  calcPeriod() {
    return this.budgetMonth * period.value;
  }

  changePeriod() {
    periodAmount.innerHTML = period.value;
  }

  notAllowClick() {
    calculateBtn.setAttribute('disabled', 'disabled');
    calculateBtn.style.cursor = 'not-allowed';
  }

  allowClick() {
    if (isNumber(salaryAmount.value)) {
      calculateBtn.removeAttribute('disabled');
      calculateBtn.style.cursor = 'pointer';
    } else {
      this.notAllowClick();
    }
  }

  eventListeners() {
    this.allowClick = this.allowClick.bind(this);
    salaryAmount.addEventListener('input', this.allowClick);

    this.start = this.start.bind(this);
    calculateBtn.addEventListener('click', this.start);

    this.addExpIncBlock = this.addExpIncBlock.bind(this);
    addExpensesBtn.addEventListener('click', this.addExpIncBlock);
    addIncomeBtn.addEventListener('click', this.addExpIncBlock);

    period.addEventListener('input', this.changePeriod);

    expensesTitle.addEventListener('input', () => {
      expensesTitle.value = expensesTitle.value.replace(/[^а-яА-Я\.\,\;]/, '');
    });
    expensesAmount.addEventListener('input', () => {
      expensesAmount.value = expensesAmount.value.replace(/[^0-9]/g, '');
    });
    incomeTitle.addEventListener('input', () => {
      incomeTitle.value = incomeTitle.value.replace(/[^а-яА-Я\.\,\;]/, '');
    });
    incomeAmount.addEventListener('input', () => {
      incomeAmount.value = incomeAmount.value.replace(/[^0-9]/g, '');
    });
    targetAmount.addEventListener('input', this.checkTarget);
  }
}

const appData = new AppData();

appData.notAllowClick();
appData.eventListeners();