'use strict';

//Проверка корректности числа
const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

//Логика игры
const guessNumber = () => {
  const guessNum = Math.ceil(Math.random() * 100);

  const startGame = () => {
    let userNum = prompt('Угадай число от 1 до 100');
  
    if (userNum === null) return alert('Игра закончена');
  
    if (!isNumber(userNum) || Number(userNum) > 100 || Number(userNum) < 1) {
      alert("Введи корректное число!");
      startGame();
    } else {
      const intNum = +userNum;
    
      if (intNum > guessNum) {
        alert('Загаданное число меньше, попробуйте ещё раз');
        return startGame();
      } else if (intNum < guessNum) {
        alert('Загаданное число больше, попробуйте ещё раз');
        return startGame();
      } else {
        return alert('Поздравляю, Вы угадали!!!');
      }
    }
  };
  startGame();
};

guessNumber();