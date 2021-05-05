window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const selectRight = document.getElementById('select');
  const selectLeft = document.getElementById('select3');
  const resultRight = document.getElementById('result');
  const resultLeft = document.getElementById('result1');
  const courseItemValue = document.querySelectorAll('.course-item-value');

  const GetCurrencyRates = () => {
    return fetch('https://www.cbr-xml-daily.ru/latest.js');
  };

  GetCurrencyRates()
    .then(response => {
      if (response.status !== 200) throw new Error('Network status is not 200');
      return response.json();
    })
    .then(data => {
      courseItemValue.forEach(item => {
        item.textContent = (1 / data.rates[item.dataset.value]).toFixed(2);
      });
    })
    .catch(error => console.warn(error));

  document.body.addEventListener('input', event => {
    let target = event.target;

    if (target.closest('#input')) {
      courseItemValue.forEach(item => {
        if (selectRight.value === item.dataset.value) {
          resultRight.value = (target.value / item.textContent).toFixed(2);
        }

        selectRight.addEventListener('change', () => {
          if (selectRight.value === item.dataset.value) {
            resultRight.value = (+target.value / +item.textContent).toFixed(2);
          }
        });
      });
    } else if (target.closest('#input1')) {
      courseItemValue.forEach(item => {
        if (selectLeft.value === item.dataset.value) {
          resultLeft.value = (target.value * item.textContent).toFixed(2);
        }

        selectLeft.addEventListener('change', () => {
          if (selectLeft.value === item.dataset.value) {
            resultLeft.value = (+target.value * +item.textContent).toFixed(2);
          }
        });
      });
    }
  });


});