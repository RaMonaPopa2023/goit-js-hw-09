import Notiflix from 'notiflix';

const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', event => {
  event.preventDefault();

  const delay = parseInt(delayEl.value);
  const step = parseInt(stepEl.value);
  const amount = parseInt(amountEl.value);

  if (!isNaN(delay) && !isNaN(step) && !isNaN(amount)) {
    createPromises(amount, delay, step);
  }
});

function createPromises(amount, initialDelay, step) {
  let delay = initialDelay;

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
