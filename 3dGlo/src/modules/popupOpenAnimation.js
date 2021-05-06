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

export { popupOpenAnimation };