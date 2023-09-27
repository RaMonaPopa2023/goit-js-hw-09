import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const startButton = document.querySelector('[data-start]');
const dateSelected = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDateTime = selectedDates[0];
    const now = Date.now();

    if (selectedDateTime > now) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future.');
    }
  },
};

let isTimerRunning = true;

const flatpickrInstance = flatpickr(dateSelected, options);

startButton.addEventListener('click', () => {
  calculateTimeLeft();
  setInterval(calculateTimeLeft, 1000);
});

function calculateTimeLeft() {
  const now = Date.now();
  const selectedDateTime = flatpickrInstance.selectedDates[0];

  if (!selectedDateTime) {
    return;
  }

  const diff = selectedDateTime - now;
  if (diff <= 0) {
    dataDays.textContent = '00';
    dataHours.textContent = '00';
    dataMinutes.textContent = '00';
    dataSeconds.textContent = '00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
