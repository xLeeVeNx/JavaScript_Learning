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
      // Send AJAX-form
      if (this.errors.size) {
        event.preventDefault();
      } else {
        const sendForm = () => {
          const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
              if (request.readyState !== 4) {
                return;
              }
              if (request.status === 200) {
                outputData();
              } else {
                errorData(request.status);
              }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
          };

          const errorMsg = 'Что-то пошло не так...';
          const loadMsg = document.createElement('img');
          loadMsg.src = 'images/preloader/preloader.gif';
          loadMsg.classList.add('preloader-gif');
          const successMsg = 'Спасибо! Мы скоро с вами свяжемся!';

          const statusMsg = document.createElement('div');
          statusMsg.style.cssText = `font-size: 2rem; color: #FFFFFF`;

          event.preventDefault();
          this.form.appendChild(statusMsg);
          statusMsg.appendChild(loadMsg);
          const formData = new FormData(this.form);
          let body = {};
          formData.forEach((value, key) => {
            body[key] = value;
          });
          postData(body,
            () => {
              statusMsg.textContent = successMsg;
            },
            (error) => {
              statusMsg.textContent = errorMsg;
              console.warn(error)
            }
          );
          
          this.disableSend();
          this.inputsReset();
          this.inputsBlock();
        };

        sendForm();
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