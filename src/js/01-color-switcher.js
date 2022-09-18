

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

btnStart.addEventListener('click', onStart);

btnStop.addEventListener('click', onStop);

function onStart() {
      btnStart.disabled = true;
      btnStop.disabled = false;
 
    timerId = setInterval(() => {
  let color = getRandomHexColor();
    document.body.style.background = color;
  }, 1000);
}

function onStop() {

      btnStart.disabled = false;
      btnStop.disabled = true;
    clearInterval(timerId);
    // document.body.style.background = 'white';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}