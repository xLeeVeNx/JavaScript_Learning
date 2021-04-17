'use strict';

// Объявление переменных
const background  = document.querySelector('.wrapper');
const color       = document.getElementById('color');
const changeColor = document.getElementById('change');

// Шестнадцатеричная система
const box   = '0123456789ABCDEF';
let   value = '#';

const changeBgColor = () => {
  for (let i = 0; i < 6; ++i) {
    value += box[Math.floor(Math.random() * 16)];
  }

  color.textContent = value;
  background.style.backgroundColor = value;
  value = '#';
};

changeColor.addEventListener('click', changeBgColor);