window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const addZero = (number) => {
    if (number < 10) return ('0' + number);
    else return number;
  };

  // Animation
  const popupOpenAnimation = () => {
    const popup = document.querySelector('.popup-content');
    let opacity = 0;
    let opacityBg = 0;
    let animationId;

    popup.parentNode.style.backgroundColor = `rgba(0,0,0,0)`;
    popup.style.opacity = opacity;

    // Element's animation
    const animate = () => {
      if (opacity <= 1) {
        opacity += 0.03;
        opacityBg += 0.015;

        popup.style.opacity = opacity;
        popup.parentNode.style.backgroundColor = `rgba(0,0,0,${opacityBg})`;

        animationId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationId);
        popup.style.opacity = 1;
        popup.parentNode.style.backgroundColor = `rgba(0,0,0,0.5})`;
      }
    };

    animationId = requestAnimationFrame(animate);
  };

  const popupCloseAnimation = () => {
    const popup = document.querySelector('.popup-content');
    let opacity = 1;
    let opacityBg = 0.5;
    let animationId;

    // Element's animation
    const animate = () => {
      if (opacity >= 0) {
        opacity -= 0.03;
        opacityBg -= 0.015;

        popup.style.opacity = opacity;
        popup.parentNode.style.backgroundColor = `rgba(0,0,0,${opacityBg})`;

        animationId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationId);
        popup.parentNode.style.display = 'none';
      }
    };

    animationId = requestAnimationFrame(animate);
  };

  // Timer
  const timer = (deadline) => {
    // DOM-elements
    const timerSeconds = document.querySelector('#timer-seconds');
    const timerMinutes = document.querySelector('#timer-minutes');
    const timerHours = document.querySelector('#timer-hours');

    // Timer's logic
    const getTimerRemainder = () => {
      const dateStop = new Date(deadline).getTime();
      let dateNow = new Date().getTime();

      let timerRemainder = (dateStop - dateNow) / 1000;
      let seconds = Math.floor(timerRemainder % 60);
      let minutes = Math.floor((timerRemainder / 60) % 60);
      let hours = Math.floor(timerRemainder / 60 / 60);

      return {
        timerRemainder,
        seconds,
        minutes,
        hours
      };
    };

    let idUpdateTimer = 0;

    const updateTimer = () => {
      let timerResult = getTimerRemainder();

      timerSeconds.textContent = addZero(timerResult.seconds);
      timerMinutes.textContent = addZero(timerResult.minutes);
      timerHours.textContent = addZero(timerResult.hours);

      if (timerResult.timerRemainder < 0) {
        clearInterval(idUpdateTimer);

        timerSeconds.textContent = '00';
        timerMinutes.textContent = '00';
        timerHours.textContent = '00';
      }
    };

    updateTimer();

    idUpdateTimer = setInterval(updateTimer, 1000);
  };

  // Menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu');
    const menuList = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menuList.querySelectorAll('li');
    const headerLink = document.querySelector('a[href="#service-block"]');

    const handlerMenu = () => {
      menuList.classList.toggle('active-menu');
    };

    const smoothScroll = (item) => {
      const element = document.querySelector(item.querySelector('a').getAttribute('href'));

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    menuBtn.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    headerLink.addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelector('#service-block').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    menuItems.forEach(item => item.addEventListener('click', (event) => {
      event.preventDefault();

      handlerMenu();
      smoothScroll(item);
    }));
  };

  // PopUp
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupOpenBtn = document.querySelectorAll('.popup-btn');
    const popupCloseBtn = document.querySelectorAll('.popup-close');

    popupOpenBtn.forEach((item) =>
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        if (screen.width >= 768) popupOpenAnimation();
      })
    );

    popupCloseBtn.forEach((item) =>
      item.addEventListener('click', () => {
        if (screen.width >= 768) popupCloseAnimation();
        else {
          popup.style.display = 'none';
        }
      })
    );
  };

  const deadline = new Date(2021, 3, 24, 23, 59);
  timer(deadline);

  toggleMenu();

  togglePopUp();
});