/* eslint-disable import/extensions */
// better to specify .js extension

import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';
import shmoment from '../common/shmoment.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  const currentMonth = getDisplayedMonth(getItem('displayedWeekStart'));

  displayedMonthElem.innerHTML = currentMonth;

  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
}

const onChangeWeek = (event) => {
  const isSwitcher =
    event.target.classList.contains('navigation__today-btn') ||
    event.target.classList.contains('navigation__nav-icon') ||
    (event.target.classList.contains('fas') &&
      event.target
        .closest('.navigation__nav-icon')
        .classList.contains('navigation__nav-icon'));

  if (!isSwitcher) {
    return;
  }

  const displayedWeekStartDate = getItem('displayedWeekStart');

  if (event.target.classList.contains('navigation__today-btn')) {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
  } else if (
    event.target.closest('.navigation__nav-icon').dataset.direction === 'prev'
  ) {
    setItem(
      'displayedWeekStart',
      getStartOfWeek(
        shmoment(displayedWeekStartDate).subtract('days', 7).result()
      )
    );
  } else {
    setItem(
      'displayedWeekStart',
      getStartOfWeek(shmoment(displayedWeekStartDate).add('days', 7).result())
    );
  }

  renderHeader();
  renderWeek();
  renderCurrentMonth();
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
