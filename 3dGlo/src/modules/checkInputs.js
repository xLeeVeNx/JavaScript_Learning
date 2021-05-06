const checkInputs = () => {
  document.body.addEventListener('input', event => {
    let target = event.target;

    if (target.matches('.calc-count') || target.matches('.calc-day') || target.matches('.calc-square')) {
      target.value = target.value.replace(/\D/, '');
    } else if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
      target.value = target.value.replace(/[^а-яё-\s]/gi, '');
    } else if (target.matches('input[name="user_email"]')) {
      target.value = target.value.replace(/[^a-z@-_.!~\*']/gi, '');
    } else if (target.matches('input[name="user_phone"]')) {
      target.value = target.value.replace(/[^\+\d\(\)-]/gi, '');
    }
  });

  document.querySelectorAll('input[name="user_name"]').forEach(item => item.addEventListener('blur', event => {
    if (event.target.value) {
      event.target.value = event.target.value[0].toUpperCase() + event.target.value.slice(1).toLowerCase();
      event.target.value = event.target.value.replace(/[^[А-Яа-я]/gi, '');
    }
  }));
};

export { checkInputs };