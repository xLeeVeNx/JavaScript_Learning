const calculator = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = document.querySelector('.calc-type');
  const calcSquare = document.querySelector('.calc-square');
  const calcDay = document.querySelector('.calc-day');
  const calcCount = document.querySelector('.calc-count');
  const result = document.getElementById('total');

  const calculateSum = () => {
    let total = 0;
    let countValue = 1;
    let dayValue = 1;

    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    let count = 0;
    const value = Math.round(total * 4 / 1000);
    const id = setInterval(() => {
      if (count < total) {
        count += value;
        result.textContent = count;
      } else {
        clearInterval(id);
        result.textContent = total;
      }
    }, 0);
  };

  calcBlock.addEventListener('change', event => {
    const target = event.target;

    if (target.matches('select') || target.matches('input')) {
      calculateSum();
    }
  });
};

export {
  calculator
};