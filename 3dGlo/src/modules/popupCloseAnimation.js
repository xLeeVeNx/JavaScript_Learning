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

export { popupCloseAnimation };