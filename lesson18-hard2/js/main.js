'use strict';

// DOM-elements
const square = document.querySelector('.square');
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');

// Main variables
let count = 40;
let animationId;
let click = true;

const animate = () => {
  count++;
  square.style.left = count + 'px';

  animationId = requestAnimationFrame(animate);
};

const startAnimate = () => {
  if (click) {
    animationId = requestAnimationFrame(animate);
    click = false;
  } else if (!click) {
    cancelAnimationFrame(animationId);
    click = true;
  }
};

start.addEventListener('click', () => {
  requestAnimationFrame(startAnimate);
});

reset.addEventListener('click', () => {
  cancelAnimationFrame(animationId);
  count = 40;
  square.style.left = count + 'px';
});

