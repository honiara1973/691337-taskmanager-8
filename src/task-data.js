import {getRandomInt, getRandomElement} from './utils';

const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const Colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const getTasks = (amount) => {

  const tasks = [];

  for (let i = 0; i < amount; i++) {
    const task = {
      title: getRandomElement([`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`]),
      dueDate: new Date(getRandomInt(Date.now() - MS_IN_WEEK, Date.now() + MS_IN_WEEK)),
      tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `sport`,
        `entertainment`, `shopping`, `repeat`, `cinema`]),

      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      colors: Colors,
      color: getRandomElement(Colors),
      repeatingDays: {
        'mo': true,
        'tu': false,
        'we': true,
        'th': false,
        'fr': false,
        'sa': true,
        'su': false,
      },

      isFavorite: false,
      isDone: false,
    };

    tasks.push(task);
  }

  return tasks;
};

export default getTasks;

