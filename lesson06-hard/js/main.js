'use strict';

//Проверка корректности числа
const isCorrect = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num) && Number(num) < 101 && Number(num) > 0;
};

const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

let start = confirm('Вы попали в игру угадай число, играем?');
if (start) {
  alert(`Правила игры. Загадывается случайное число в диапозоне от 1 до 100 и Вы должны угадать его. 
У вас есть 5 попыток. В случае, если Вы угадали число, Ваша ставка удваивается, иначе же ставка сгорает.`);

  const guessNumber = () => {
    let bet = prompt('Начинаем! Введите Вашу ставку в рублях');
    while (!isNumber(bet)) bet = prompt('Начинаем! Введите Вашу ставку в рублях');

    const guessNum = Math.ceil(Math.random() * 100);
    let attempts = 5;

    const startGame = (attempts = 5) => {
      if (attempts) {

        let userNum = prompt('Угадай число от 1 до 100');

        if (userNum === null) return alert(`Игра закончена, вы проиграли ${bet} рублей`);

        if (!isCorrect(userNum)) {
          alert('Введи корректное число!');
          startGame();
        } else {
          const intNum = +userNum;

          if (intNum > guessNum) {
            isMore(attempts, startGame);
          } else if (intNum < guessNum) {
            isLess(attempts, startGame);
          } else if (confirm(`Поздравляю Вы выиграли ${bet * 2} рублей! Хотели бы сыграть еще?`)) {
            return guessNumber();
          } else {
            return alert(`Игра закончена, поздравляю Вы выиграли ${bet * 2} рублей!`);
          }
        }
      } else if (confirm('Попытки закончились, хотите сыграть еще?')) {
        return guessNumber();
      } else {
        return alert(`Вы проиграли ${bet} рублей :(`);
      }
    };
    startGame();
  };
  guessNumber(); 
} else alert('А жаль, всего доброго!');

function isMore(attempts, startGame) {
  alert(`Загаданное число меньше, осталось ${--attempts} попыток`);
  return startGame(attempts);
}

function isLess(attempts, startGame) {
  alert(`Загаданное число больше, осталось ${--attempts} попыток`);
  return startGame(attempts);
}