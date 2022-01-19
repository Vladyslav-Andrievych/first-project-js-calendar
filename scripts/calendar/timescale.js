/* eslint-disable import/extensions */
// better to specify .js extension

import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const generatedMarkUp = createNumbersArray(0, 23)
    .map((hour) => {
      return `
              <div class="time-slot">
                  <span class="time-slot__time">${hour}:00</span>
              </div>
              `;
    })
    .join('');

  const calendarTimeScaleElem = document.querySelector('.calendar__time-scale');

  calendarTimeScaleElem.innerHTML = generatedMarkUp;

  const firstTimeSlotElem = document.querySelector('.time-slot__time');
  firstTimeSlotElem.textContent = '';

  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
};
