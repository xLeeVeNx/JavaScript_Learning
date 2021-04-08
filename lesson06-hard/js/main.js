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
У вас есть 10 попыток. В случае, если Вы угадали число, Ваша ставка удваивается, иначе же ставка сгорает.`);

  const guessNumber = () => {
    let bet = prompt('Начинаем! Введите Вашу ставку в рублях');
    while (!isNumber(bet)) bet = prompt('Начинаем! Введите Вашу ставку в рублях');

    const guessNum = 23;
    let attempts = 10;

    const startGame = () => {
      if (attempts) {

        let userNum = prompt('Угадай число от 1 до 100');

        if (userNum === null) return alert(`Игра закончена, вы проиграли ${bet} рублей`);

        if (!isCorrect(userNum)) {
          alert('Введи корректное число!');
          startGame();
        } else {
          const intNum = +userNum;

          if (intNum > guessNum) {
            isMore();
          } else if (intNum < guessNum) {
            isLess();
          } else if (confirm('Поздравляю Вы выиграли ${bet * 2} рублей! Хотели бы сыграть еще?')) {
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

    function isMore() {
      alert(`Загаданное число меньше, осталось ${--attempts} попыток`);
      return startGame();
    }

    function isLess() {
      alert(`Загаданное число больше, осталось ${--attempts} попыток`);
      return startGame();
    }
  };
  guessNumber(); 
} else alert('А жаль, всего доброго!');