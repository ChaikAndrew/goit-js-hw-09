import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate = null;
let currentDate = null;
let intervalId = null;
let delta = 0;

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');

const deltaDays = document.querySelector('[data-days]');

const deltaHours = document.querySelector('[data-hours]');
const deltaMinutes = document.querySelector('[data-minutes]');
const deltaSeconds = document.querySelector('[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
  minuteIncrement: 1,
    enableSeconds: true,

    onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedDate = selectedDates[0].getTime();
      currentDate = options.defaultDate.getTime()
if (currentDate > selectedDate) {
            buttonStart.disabled = true;
  Notify.failure('Please choose a date in the future');
            return;
        } 
        buttonStart.disabled = false;
      }
        };


flatpickr(input, options);



buttonStart.addEventListener('click', onStart);
buttonStart.disabled = true;

function onStart() {
  input.disabled = true;
   buttonStart.disabled = true;
  intervalId = setInterval(() => {
    if (selectedDate - currentDate < 999) {
      clearInterval(intervalId);
      return;
    } else {
      currentDate += 1000;
      delta = Math.floor(selectedDate - currentDate);
      convertMs(delta);
       }
  },1000)
    
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createMarkUp({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function createMarkUp({ days, hours, minutes, seconds }) {
  deltaDays.textContent = days;
  deltaHours.textContent = hours;
  deltaMinutes.textContent = minutes;
  deltaSeconds.textContent = seconds;
}