import makeFilterElement from './make_filter';
import makeTaskCard from './make_task';

const TASKS_AMOUNT_INITIAL = 7;

const Filters = [
  [`All`, 15], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const TaskCards = [
  {
    color: `black`,
    text: `This is example of new task, you can add picture, set date and time, add tags.`
  },
  {
    color: `blue`,
    text: ``
  },
  {
    color: `yellow`,
    text: `Here is a card with filled data`
  },
  {
    color: `pink`,
    text: `It is example of repeating task`
  }
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;
const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const filterContainer = document.querySelector(`.main__filter`);
Filters.forEach(([first, second]) =>
  filterContainer.insertAdjacentHTML(`beforeEnd`, makeFilterElement(first, second)));

const boardTasksContainer = document.querySelector(`.board__tasks`);

const insertTaskCards = (amount) => {

  for (let i = 0; i < amount; i++) {
    const randomCard = getRandomElement(TaskCards);
    boardTasksContainer.insertAdjacentHTML(`beforeEnd`,
        makeTaskCard(randomCard.color, randomCard.text));
  }

};

insertTaskCards(TASKS_AMOUNT_INITIAL);

filterContainer.addEventListener(`click`, () => {

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  insertTaskCards(getRandomInt(1, 10));
});
