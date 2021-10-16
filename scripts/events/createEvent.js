/* eslint-disable import/extensions */
// better to specify .js extension

import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  [...document.querySelectorAll('.event-form__field')].forEach((field) => {
    field.value = '';
  });
  // ф-ция должна очистить поля формы от значений
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
  // здесь нужно закрыть модальное окно и очистить форму
}

const counter = () => {
  let count = -1;

  return function () {
    count += 1;
    return count;
  };
};

const idGenerator = counter();

function onCreateEvent(event) {
  event.preventDefault();

  const formData = [...new FormData(eventFormElem)].reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );

  // сделать время в формате UTC!??
  const id = idGenerator();
  const { title, description } = formData;
  const start = getDateTime(formData.date, formData.startTime);
  const end = getDateTime(formData.date, formData.endTime);

  const newEvent = { id, title, description, start, end };

  const events = getItem('events');

  for (let i = 0; i < events.length; i += 1) {
    if (newEvent.start < events[i].end && newEvent.end > events[i].start) {
      alert(`
Error! 
Already exist event at this time. 
Please, change time.`);
      return;
    }
  }

  events.push(newEvent);

  setItem('events', events);
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  onCloseEventForm();
  renderEvents();
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
}

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  eventFormElem.addEventListener('submit', onCreateEvent);
  // подпишитесь на сабмит формы и на закрытие формы
}
