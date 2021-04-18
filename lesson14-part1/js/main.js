'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height   = height;
  this.width    = width;
  this.bg       = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElem = function() {
  const selectorValue = this.selector.slice(1);
  const cssProp = `
    height: ${this.height};
    width: ${this.width};
    background: ${this.bg};
    font-size: ${this.fontSize};
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

const paragraph = new DomElement('.paragraph', '300px', '100%', 'red', '36px');
const div = new DomElement('#div', '500px', '100%', 'green', '28px');

paragraph.createElem();
div.createElem();