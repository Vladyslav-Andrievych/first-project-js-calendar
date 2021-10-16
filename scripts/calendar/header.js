/* eslint-disable import/extensions */
// better to specify .js extension

import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  const generatedMarkUp = generateWeekRange(getItem('displayedWeekStart'))
    .map((date) => {
      return date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
        ? `<div class="calendar__day-label day-label day-label_today">
            <span class="day-label__day-name">
                ${daysOfWeek[date.getDay()]}
            </span>
            <span class="day-label__day-number">
                ${date.getDate()}
            </span>
        </div>`
        : `<div class="calendar__day-label day-label">
            <span class="day-label__day-name">
                ${daysOfWeek[date.getDay()]}
            </span>
            <span class="day-label__day-number">
                ${date.getDate()}
            </span>
        </div>`;
    })
    .join('');

  const calendarHeaderElem = document.querySelector('.calendar__header');

  calendarHeaderElem.innerHTML = generatedMarkUp;

  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header

  // ????? в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
};

const createEventElement = document.querySelector('.create-event-btn');
createEventElement.addEventListener('click', openModal);
// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
