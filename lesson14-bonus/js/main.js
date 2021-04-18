'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
  }

  DomElement.prototype.createElem = function () {
    const selectorValue = this.selector.slice(1);
    const cssProp = `
    position: absolute;
    top: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    height: ${this.height};
    width: ${this.width};

    font-size: ${this.fontSize};

    background: ${this.bg};
    text-align: center;
  `;

    if (this.selector[0] === '.') {
      let div = document.createElement('div');

      div.classList.add(selectorValue);
      div.textContent = `Это div с классом ${selectorValue}`;
      div.style.cssText = cssProp;

      document.body.append(div);
    } else if (this.selector[0] === '#') {
      let paragraph = document.createElement('p');

      paragraph.id = selectorValue;
      paragraph.textContent = `Это параграф с айди ${selectorValue}`;
      paragraph.style.cssText = cssProp;

      document.body.append(paragraph);
    }
  };

  const div = new DomElement('.block', '100px', '100px', 'red', '24px');
  div.createElem();

  const element = document.querySelector('.block');

  const move = (e) => {
    let top  = '';
    let left = '';
    switch (e.key) {
      case 'ArrowUp':
        top = parseFloat(element.style.top);
        element.style.top = +top - 10 + 'px';
        break;

      case 'ArrowDown':
        top = parseFloat(element.style.top);
        element.style.top = +top + 10 + 'px';
        break;

      case 'ArrowLeft':
        left = parseFloat(element.style.left);
        element.style.left = +left - 10 + 'px';
        break;

      case 'ArrowRight':
        left = parseFloat(element.style.left);
        element.style.left = +left + 10 + 'px';
        break;

      default:
        break;
    }
  };

  document.addEventListener('keydown', move);
}