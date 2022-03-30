export default class Timer {
   #hours = null;
   #minutes;
   #seconds;
   #milliSeconds;
   #totalMilliseconds = 0;
   #running;
   #paused = false;
   constructor(element) {
      this.element = element;
      this.render();
   }

   render() {
      this.#hours = parseInt(this.#totalMilliseconds / 3600000);
      this.#minutes = parseInt(this.#totalMilliseconds / 60000) % 60;
      this.#seconds = parseInt(this.#totalMilliseconds / 1000) % 60;
      this.#milliSeconds = parseInt(this.#totalMilliseconds / 10) % 100;

      this.element.innerHTML = `${
         this.#hours < 10 ? '0' + this.#hours : this.#hours
      }:${this.#minutes < 10 ? '0' + this.#minutes : this.#minutes}:${
         this.#seconds < 10 ? '0' + this.#seconds : this.#seconds
      }`;

      const ms = document.createElement('span');
      ms.style.fontSize = '0.6em';
      ms.style.marginLeft = '0.25em';
      ms.textContent =
         this.#milliSeconds < 10
            ? `0${this.#milliSeconds}`
            : this.#milliSeconds;
      this.element.append(ms);
   }

   start(time, callBack) {
      let error = false;

      const pattern = /[0-9]:?/g;
      const checkedTime = time.match(pattern);
      const splittedTime = time.split(':');
      const emptysplittedTime = splittedTime.some((number) => number === '');
      if (splittedTime.length > 3 || emptysplittedTime) {
         error = 'Invalid Format';
         this.#totalMilliseconds = 0;
         return error;
      }
      if (!time) {
         this.#totalMilliseconds = 0;
         error = 'Enter a minimun number to start the Timer';
         return error;
      }
      if (checkedTime === null || checkedTime.join('') !== time) {
         this.#totalMilliseconds = 0;
         error = 'Invalid Characters or Pattern';
         return error;
      }
      if (!time.includes(':')) {
         this.#totalMilliseconds = parseInt(time * 1000);
      } else {
         switch (splittedTime.length) {
            case 2:
               this.#totalMilliseconds = parseInt(splittedTime[0]) * 60000;
               this.#totalMilliseconds += parseInt(splittedTime[1]) * 1000;
               break;
            case 3:
               this.#totalMilliseconds = parseInt(splittedTime[0]) * 3600000;
               this.#totalMilliseconds += parseInt(splittedTime[1]) * 60000;
               this.#totalMilliseconds += parseInt(splittedTime[2]) * 1000;
               break;
         }
      }
      this.#paused = false;
      this.#run(callBack);
      this.render();
   }

   pause() {
      this.#paused = true;
   }
   resume() {
      this.#paused = false;
      if (this.#totalMilliseconds) {
         this.#run();
      }
   }
   stop() {
      clearInterval(this.#running);
      this.#running = undefined;
      this.#totalMilliseconds = 0;
   }
   reset() {
      if (this.#running) {
         clearInterval(this.#running);
         this.#running = undefined;
      }
      this.#totalMilliseconds = 0;
      this.render();
   }

   #run(callBack) {
      if (!this.#running) {
         this.#running = setInterval(() => {
            if (this.#totalMilliseconds === 0) {
               clearInterval(this.#running);
               this.#running = undefined;
               if (callBack) callBack();
            } else if (this.#paused) {
               clearInterval(this.#running);
               this.#running = undefined;
            } else if (!this.#paused) {
               this.#totalMilliseconds -= 50;
               this.render();
            }
         }, 50);
      }
   }
}
