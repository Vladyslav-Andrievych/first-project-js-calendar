/* eslint-disable import/extensions */
// better to specify .js extension

import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const generatedMarkUp = createNumbersArray(0, 23)
    .map((hour) => {
      if (hour === 0) {
        return `
                  <div class="time-slot">
                      <span class="time-slot__time"></span>
                  </div>
                  `;
      }

      if (hour <= 12) {
        return `
                <div class="time-slot">
                    <span class="time-slot__time">${hour} AM</span>
                </div>
                `;
      }

      return `
             <div class="time-slot">
                <span class="time-slot__time">${hour - 12} PM</span>
             </div>
                `;
    })
    .join('');

  const calendarTimeScaleElem = document.querySelector('.calendar__time-scale');

  calendarTimeScaleElem.innerHTML = generatedMarkUp;

  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
};
