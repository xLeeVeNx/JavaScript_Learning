import { smoothScroll } from './smoothScroll.js';

const toggleMenu = () => {
  const menuList = document.querySelector('menu');
  const menuLinks = menuList.querySelectorAll('li>a');

  const handlerMenu = () => {
    menuList.classList.toggle('active-menu');
  };

  document.body.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains('close-btn')) {
      handlerMenu();
    } else if (target.closest('a[href="#service-block"]')) {
      event.preventDefault();
      smoothScroll(event.target.closest('a[href="#service-block"]'));
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

export { toggleMenu };