const smoothScroll = (item) => {
  const element = document.querySelector(item.getAttribute('href'));

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

export { smoothScroll };