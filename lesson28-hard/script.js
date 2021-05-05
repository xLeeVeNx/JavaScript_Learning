document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  select.addEventListener('change', () => {
    const getData = () => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {
            return;
          } 
          if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            data.cars.forEach(item => {
              if (item.brand === select.value) {
                const {brand, model, price } = item;
                resolve(`
                  Тачка ${brand} ${model} <br>
                  Цена: ${price}$
                `);
              }
            });
          } else {
            reject('Произошла ошибка', request.status);
          }
        });
      });
    };

    getData()
      .then(result => {
        output.innerHTML = result;
      })
      .catch( (error, status) => {
        output.innerHTML = error;
        console.warn(status);
      })
      .finally(console.log('Всё ок :)'));
  });
});