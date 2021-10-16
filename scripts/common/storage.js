const storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [
    {
      id: 0.7520027086457333, // id понадобится для работы с событиями
      title: 'Title 1',
      description: 'Some description 1',
      start: new Date('2021-10-12T01:10:00.000'),
      end: new Date('2021-10-12T04:30:00.000'),
    },
    {
      id: 0.7520027086457334, // id понадобится для работы с событиями
      title: 'Title 2',
      description: 'Some description 2',
      start: new Date('2021-10-13T12:10:00.000'),
      end: new Date('2021-10-13T15:30:00.000'),
    },
    {
      id: 0.7520027086457335, // id понадобится для работы с событиями
      title: 'Title 3',
      description: 'Some description 3',
      start: new Date('2021-10-14T09:10:00.000'),
      end: new Date('2021-10-14T10:30:00.000'),
    },
  ],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
  Object.assign(storage, { [key]: value });
  // ф-ция должна устанавливать значения в объект storage
};

export const getItem = (key) => storage[key];
// ф-ция должна возвращать по ключу значения из объекта storage

// пример объекта события
// const example = {
//   id: 0.7520027086457333, // id понадобится для работы с событиями
//   title: 'Title 1',
//   description: 'Some description 1',
//   start: new Date('2020-10-04T01:10:00.000Z'),
//   end: new Date('2020-10-04T04:30:00.000Z'),
// };
