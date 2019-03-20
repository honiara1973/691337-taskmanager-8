import {getRandomInt, compareRandom} from './utils';

const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const Colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const Tags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `sport`,
  `entertainment`, `shopping`, `repeat`, `cinema`];

const getTasks = (amount) => {

  const tasks = [];

  for (let i = 0; i < amount; i++) {
    const task = {
      title: ``, // getRandomElement([`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`]),
      dueDate: {
        date: new Date(getRandomInt(Date.now() - MS_IN_WEEK, Date.now() + MS_IN_WEEK)),
        time: new Date(),
      },
      tags: new Set([...Tags]
      .slice()
      .sort(compareRandom)
      .slice(0, getRandomInt(0, 3))),

      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      colors: Colors,
      color: `black`,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
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
