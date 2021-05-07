import { form } from './sendForm.js';

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
      } else {
        // Send AJAX-form
        form(this.form, event);

        this.disableSend();
        this.inputsReset();
        this.inputsBlock();
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

  disableSend() {
    const item = this.form.querySelector('.btn');
    item.disabled = 'disabled';
    item.style.cursor = 'not-allowed';
  }

  inputsReset() {
    this.elementsForm.forEach(item => {
      item.value = '';
      item.placeholder = 'Поле было заполнено';
    });
  }

  inputsBlock() {
    this.elementsForm.forEach(item => item.disabled = 'disabled');
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^(\+?[78]([-()]*\d){10}|\+?2([-()]*\d){7})$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }

    if (!this.pattern.name) {
      this.pattern.name = /^[А-Яа-я]{2,50}$/;
    }
  }
}

export { Validator };