import Timer from './Timer.js';

const timerContainer = document.querySelector('.timer');

const timer = new Timer(timerContainer);

const input = document.querySelector('input');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resumeBtn = document.querySelector('.resume');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const errorBox = document.querySelector('.error');

startBtn.addEventListener('click', () => {
   const err = timer.start(input.value);
   if (!err) {
      errorBox.style.display = 'none';
   } else {
      errorBox.style.display = 'block';
      errorBox.textContent = err;
   }
});
pauseBtn.addEventListener('click', () => {
   timer.pause();
});
resumeBtn.addEventListener('click', () => {
   timer.resume();
});
stopBtn.addEventListener('click', () => {
   timer.stop();
});
resetBtn.addEventListener('click', () => {
   timer.reset();
});
