'use strict';

const debounce = (fn, ms) => {
  let timeout;
  return function() {
    const fnCall = () => { fn.apply(this, arguments); };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

const input  = document.querySelector('.input');
const result = document.querySelector('.parag');

let onChange = (event) => {
  result.textContent = event.target.value;
};

onChange = debounce(onChange, 300);

input.addEventListener('input', onChange);



