class Validator {
  constructor({
    selector,
    pattern = {},
    method
  }) {
    this.form = document.querySelector(selector);
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' &&
        item.type.toLowerCase() !== 'button';
    });

    this.pattern = pattern;
    this.method = method;

    this.errors = new Set();
  }

  init() {
    this.setPattern();
    this.elementsForm.forEach(item => item.addEventListener('change', this.check.bind(this)));
    this.form.addEventListener('submit', event => {
      this.elementsForm.forEach(item => this.check({
        target: item
      }));
      if (this.errors.size) {
        event.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },

      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => validMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Для работы валидатора необходимо передать id полей и методы проверки этиъ полей!');
    }

    return true;
  }

  check(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.errors.delete(target);
    } else {
      this.showError(target);
      this.errors.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');

    if (elem.placeholder === 'Неккоректные данные') {
      return;
    }

    elem.placeholder = 'Неккоректные данные';
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    if (elem.placeholder === 'Неккоректные данные') {
      elem.placeholder = '';
    }
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }

    if (!this.pattern.name) {
      this.pattern.name = /[А-Яа-я]$/;
    }
  }
}

const form1 = new Validator({
  selector: '#form1',
  pattern: {},
  method: {
    'form1-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],

    'form1-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],

    'form1-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
  }
});

const form2 = new Validator({
  selector: '#form2',
  pattern: {},
  method: {
    'form2-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],

    'form2-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],

    'form2-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],

    'form2-message': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
  }
});

const form3 = new Validator({
  selector: '#form3',
  pattern: {},
  method: {
    'form3-phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],

    'form3-email': [
      ['notEmpty'],
      ['pattern', 'email']
    ],

    'form3-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ],
  }
});

form1.init();
form2.init();
form3.init();