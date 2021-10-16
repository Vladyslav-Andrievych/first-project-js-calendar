/* eslint-disable import/extensions */
// better to specify .js extension

import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  const eventElem = event.target.closest('.event');

  if (!eventElem) {
    return;
  }

  openPopup(event.clientX, event.clientY);
  setItem('eventIdToDelete', eventElem.dataset.eventId);
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
}

function removeEventsFromCalendar() {
  [...document.querySelectorAll('.event')].forEach((event) => event.remove());
}

const formatter = new Intl.DateTimeFormat('en', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const getEventTime = (date) => formatter.format(date);

const createEventElement = (event) => {
  const { id, title, description, start, end } = event;

  const eventElem = document.createElement('div');
  eventElem.dataset.eventId = id;
  eventElem.classList.add('event');
  eventElem.setAttribute(
    'style',
    `top: ${start.getMinutes()}px; height: ${Math.ceil(
      (end - start) / 60000
    )}px`
  );

  const eventTitleElem = document.createElement('h4');
  eventTitleElem.classList.add('event__title');
  eventTitleElem.textContent = title;
  eventElem.append(eventTitleElem);

  const eventTimeElem = document.createElement('p');
  eventTimeElem.classList.add('event__time');
  eventTimeElem.textContent = `${getEventTime(start)} - ${getEventTime(end)}`;
  eventElem.append(eventTimeElem);

  const eventDescriptionElem = document.createElement('p');
  eventDescriptionElem.classList.add('event__description');
  eventDescriptionElem.textContent = description;
  eventElem.append(eventDescriptionElem);

  return eventElem;

  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
};

export const renderEvents = () => {
  removeEventsFromCalendar();

  const eventsList = getItem('events');
  const weekStart = getItem('displayedWeekStart');
  const weekEnd = shmoment(weekStart).add('days', 7).result();
  eventsList
    .filter((event) => event.start >= weekStart && event.end < weekEnd)
    .forEach((event) => {
      const eventElem = createEventElement(event);

      const dayElem = document.querySelector(
        `[data-day="${event.start.getDate()}"]`
      );
      const timeSlotElem = [...dayElem.children].find(
        (elem) => elem.dataset.time === String(event.start.getHours())
      );
      timeSlotElem.append(eventElem);
    });

  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
};

function onDeleteEvent() {
  const events = getItem('events');
  const eventIdToDelete = getItem('eventIdToDelete');

  const indexToDelete = events.findIndex(
    (elem) => elem.id === Number(eventIdToDelete)
  );

  events.splice(indexToDelete, 1);
  setItem('events', events);

  closePopup();
  renderEvents();
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
