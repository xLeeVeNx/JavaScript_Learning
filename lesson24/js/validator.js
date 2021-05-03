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
    this.addStyles();
    this.elementsForm.forEach(item => item.addEventListener('change', this.check.bind(this)));
    this.form.addEventListener('submit', event => {
      this.elementsForm.forEach(item => this.check({target: item}));
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

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green
      }

      input.error {
        border: 2px solid red
      }

      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red
      }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }

    if (!this.pattern.name) {
      this.pattern.name = /^[А-Яа-я]$/;
    }
  }
}