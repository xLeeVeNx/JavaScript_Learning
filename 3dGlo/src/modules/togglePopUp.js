import { popupOpenAnimation } from './popupOpenAnimation.js';
import { popupCloseAnimation } from './popupCloseAnimation.js';

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

export { togglePopUp };