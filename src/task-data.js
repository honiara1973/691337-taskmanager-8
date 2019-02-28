import {getRandomInt, getRandomElement} from './utils';

const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const Titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const HashTags = [`homework`, `theory`, `practice`, `intensive`, `keks`, `sport`,
  `entertainment`, `shopping`, `repeat`, `cinema`];
const Colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const task = {

  get title() {
    return getRandomElement(Titles);
  },

  get dueDate() {
    return new Date(getRandomInt(Date.now() - MS_IN_WEEK, Date.now() + MS_IN_WEEK));
  },

  get tags() {
    const hashTagsAmount = getRandomInt(0, 3);
    const tagsSet = new Set();
    for (let i = 0; i < hashTagsAmount; i++) {
      tagsSet.add(getRandomElement(HashTags));
    }
    return tagsSet;
  },

  picture: `//picsum.photos/100/100?r=${Math.random()}`,

  get color() {
    return getRandomElement(Colors);
  },

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

export default task;
