const form = (form, event) => {
  const sendForm = body => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const errorMsg = 'Что-то пошло не так...';

  const loadMsg = document.createElement('img');
  loadMsg.src = 'images/preloader/preloader.gif';
  loadMsg.classList.add('preloader-gif');

  const successMsg = 'Спасибо! Мы скоро с вами свяжемся!';

  const statusMsg = document.createElement('div');
  statusMsg.style.cssText = `font-size: 2rem; color: #FFFFFF`;

  event.preventDefault();
  form.appendChild(statusMsg);
  statusMsg.appendChild(loadMsg);
  const formData = new FormData(form);
  let body = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });

  sendForm(body)
    .then(response => {
      if (response.status !== 200) throw new Error('Network status is not 200');
      statusMsg.textContent = successMsg;
      setTimeout(() => {
        statusMsg.remove();
      }, 2000);
    })
    .catch(error => {
      statusMsg.textContent = errorMsg;
      console.warn(error);
      setTimeout(() => {
        statusMsg.remove();
      }, 2000);
    });
};

export { form };