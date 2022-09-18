import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onCreatePromise);


function onCreatePromise(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let newDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    newDelay = newDelay + Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}