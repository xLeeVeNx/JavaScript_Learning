'use strict';

function foo(str) {
  if (typeof str !== 'string') {
    return console.log('Аргумент должен быть типом "string"');
  } 

  let result = str.replace(/\s+/g, " ").trim();

  if (result.length > 30) {
    return console.log(result.slice(0, 30) + '...');
  }

  return console.log(result);
}

foo('');