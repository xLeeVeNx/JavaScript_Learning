const commandPhoto = () => {
  document.querySelector('.command').addEventListener('mouseover', event => {
    let target = event.target;

    if (target.classList.contains('command__photo')) {
      [target.src, target.dataset.img] = [target.dataset.img, target.src];
    }
  });

  document.querySelector('.command').addEventListener('mouseout', event => {
    let target = event.target;

    if (target.classList.contains('command__photo')) {
      [target.src, target.dataset.img] = [target.dataset.img, target.src];
    }
  });
};

export { commandPhoto };