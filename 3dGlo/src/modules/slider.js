const slider = () => {
  const sliderWrapper = document.querySelector('.portfolio-content');
  const sliderItems = document.querySelectorAll('.portfolio-item');
  const sliderButtons = document.querySelectorAll('.portfolio-btn');
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
      sliderDots.forEach((item, index) => {
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
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      sliderStop();
    }
  });

  sliderWrapper.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      sliderStart();
    }
  });
};

export { slider };