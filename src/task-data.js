import {getRandomInt, getRandomElement, compareRandom} from './utils';

const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const Colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const Tags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `sport`,
  `entertainment`, `shopping`, `repeat`, `cinema`];

const getTasks = (amount) => {

  const tasks = [];

  for (let i = 0; i < amount; i++) {
    const task = {
      title: getRandomElement([`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`]),
      dueDate: new Date(getRandomInt(Date.now() - MS_IN_WEEK, Date.now() + MS_IN_WEEK)),

      tags: new Set([...Tags]
      .slice()
      .sort(compareRandom)
      .slice(0, getRandomInt(0, 3))),

      picture: `http://picsum.photos/100/100?r=${Math.random()}`,
      colors: Colors,
      //color: getRandomElement(Colors),
      color: `black`,
      repeatingDays: {
        'mo': getRandomElement([true, false]),
        'tu': getRandomElement([true, false]),
        'we': getRandomElement([true, false]),
        'th': getRandomElement([true, false]),
        'fr': getRandomElement([true, false]),
        'sa': getRandomElement([true, false]),
        'su': getRandomElement([true, false]),
      },

      isFavorite: false,
      isDone: false,
    };

    tasks.push(task);
  }

  return tasks;
};

export default getTasks;
