window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const addZero = (number) => {
    if (number < 10) return ('0' + number);
    else return number;
  };

  // Timer
  const timer = (deadline) => {
    // DOM-elements
    const timerSeconds = document.querySelector('#timer-seconds');
    const timerMinutes = document.querySelector('#timer-minutes');
    const timerHours   = document.querySelector('#timer-hours');

    // Timer's logic
    const getTimerRemainder = () => {
      const dateStop = new Date(deadline).getTime();
      let   dateNow  = new Date().getTime();
  
      let timerRemainder = (dateStop - dateNow) / 1000;
      let seconds        = Math.floor(timerRemainder % 60);
      let minutes        = Math.floor( (timerRemainder / 60) % 60 );
      let hours          = Math.floor(timerRemainder / 60 / 60);

      return {timerRemainder, seconds, minutes, hours};
    };

    let idUpdateTimer = 0;

    const updateTimer = () => {
      let timerResult = getTimerRemainder();

      timerSeconds.textContent = addZero(timerResult.seconds);
      timerMinutes.textContent = addZero(timerResult.minutes);
      timerHours.textContent   = addZero(timerResult.hours);

      if (timerResult.timerRemainder < 0) {
        clearInterval(idUpdateTimer);

        timerSeconds.textContent = '00';
        timerMinutes.textContent = '00';
        timerHours.textContent   = '00';
      }
    };

    updateTimer();

    idUpdateTimer = setInterval(updateTimer, 1000);
  };

  // Timer's end
  const deadline = new Date(2021, 3, 24, 23, 59);
  timer(deadline);
});