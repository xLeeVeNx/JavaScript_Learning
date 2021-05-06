'use strict';

// Form Validator and AJAX-send
import { Validator } from './modules/validator.js';

// Timer
import { timer } from './modules/timer.js';

// Menu
import { toggleMenu } from './modules/toggleMenu.js';

// PopUp
import { togglePopUp } from './modules/togglePopUp.js';

// Tabs
import { tabs } from './modules/tabs.js';

// Slider
import { slider } from './modules/slider.js';

// Change comamnd person's image
import { commandPhoto } from './modules/commandPhoto.js';

// checkInputs
import { checkInputs } from './modules/checkInputs.js';

// Calculator
import { calculator } from './modules/calculator.js';

// Running functions
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

const deadline = new Date(2021, 4, 1, 23, 59);
timer(deadline);

toggleMenu();

togglePopUp();

tabs();

slider();

commandPhoto();

checkInputs();

calculator();