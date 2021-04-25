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
        popup.parentNode.style.backgroundColor = `rgba(0,0,0,0.5)`;
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

  const smoothScroll = (item) => {
    const element = document.querySelector(item.getAttribute('href'));

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
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
    const menuLinks = menuList.querySelectorAll('li>a');

    const handlerMenu = () => {
      menuList.classList.toggle('active-menu');
    };

    menuBtn.addEventListener('click', handlerMenu);

    menuList.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else {
        menuLinks.forEach(item => {
          if (item === target) {
            event.preventDefault();

            handlerMenu();
            smoothScroll(item);
          }
        });
      }
    });
  };

  document.querySelector('a[href="#service-block"]').addEventListener('click', event => {
    event.preventDefault();

    smoothScroll(event.target.closest('a[href="#service-block"]'));
  });

  // PopUp
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupOpenBtn = document.querySelectorAll('.popup-btn');

    popupOpenBtn.forEach((item) =>
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        popupOpenAnimation();
      })
    );

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popupCloseAnimation();
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popupCloseAnimation();
        }
      }

    });
  };

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  const deadline = new Date(2021, 3, 24, 23, 59);
  timer(deadline);

  toggleMenu();

  togglePopUp();

  tabs();
});