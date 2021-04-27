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

    document.body.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else if (target.closest('.menu')) {
        handlerMenu();
      } else if (!target.closest('.active-menu')) {
        menuList.classList.remove('active-menu');
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

  const slider = () => {
    const sliderWrapper   = document.querySelector('.portfolio-content');
    const sliderItems     = document.querySelectorAll('.portfolio-item');
    const sliderButtons   = document.querySelectorAll('.portfolio-btn');
    const sliderDotsInner = document.querySelector('.portfolio-dots');

    let sliderItemIndex = 0;
    let intervalId;

    const addSliderDots = () => {
      let li = document.createElement('li');
      li = `<li class="dot"></li>`;

      sliderItems.forEach(item => {
        sliderDotsInner.insertAdjacentHTML('afterbegin', li);
      });
    };

    addSliderDots();
    const sliderDots = document.querySelectorAll('.dot');
    sliderDots[0].classList.add('dot-active');

    const prevSliderItem = (slides, index, className) => {
      slides[index].classList.remove(className);
    };

    const nextSliderItem = (slide, index, className) => {
      slide[index].classList.add(className);
    };

    const sliderLogic = () => {
      prevSliderItem(sliderItems, sliderItemIndex, 'portfolio-item-active');
      prevSliderItem(sliderDots, sliderItemIndex, 'dot-active');
      sliderItemIndex++;

      if (sliderItemIndex >= sliderItems.length) {
        sliderItemIndex = 0;
      }

      nextSliderItem(sliderItems, sliderItemIndex, 'portfolio-item-active');
      nextSliderItem(sliderDots, sliderItemIndex, 'dot-active');
    };

    const sliderStart = (time = 3000) => {
      intervalId = setInterval(sliderLogic, time);
    };

    const sliderStop = () => {
      clearInterval(intervalId);
    };

    sliderStart();

    sliderWrapper.addEventListener('click', event => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSliderItem(sliderItems, sliderItemIndex, 'portfolio-item-active');
      prevSliderItem(sliderDots, sliderItemIndex, 'dot-active');

      if (target.matches('#arrow-right')) {
        sliderItemIndex++;
      } else if (target.matches('#arrow-left')) {
        sliderItemIndex--;
      } else if (target.matches('.dot')) {
        sliderDots.forEach( (item, index) => {
          if (item === target) {
            sliderItemIndex = index;
          }
        });
      }

      if (sliderItemIndex >= sliderItems.length) {
        sliderItemIndex = 0;
      }

      if (sliderItemIndex < 0) {
        sliderItemIndex = sliderItems.length - 1;
      }

      nextSliderItem(sliderItems, sliderItemIndex, 'portfolio-item-active');
      nextSliderItem(sliderDots, sliderItemIndex, 'dot-active');
    });

    sliderWrapper.addEventListener('mouseover', event => {
      if ( event.target.matches('.portfolio-btn') || event.target.matches('.dot') ) {
        sliderStop();
      }
    }); 

    sliderWrapper.addEventListener('mouseout', event => {
      if ( event.target.matches('.portfolio-btn') || event.target.matches('.dot') ) {
        sliderStart();
      }
    }); 
  };

  const deadline = new Date(2021, 3, 24, 23, 59);
  timer(deadline);

  toggleMenu();

  togglePopUp();

  tabs();

  slider();
});