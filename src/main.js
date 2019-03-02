import makeFilterElement from './make-filter';
import getTasks from './task-data';
import makeTaskCard from './make-task';

import {getRandomInt} from './utils';

const TASKS_AMOUNT_INITIAL = 7;

const Filters = [
  [`All`, 15], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const insertTaskCards = (amount) => {
  const taskCards = getTasks(amount);
  return taskCards.forEach((it) =>
    boardTasksContainer.insertAdjacentHTML(`beforeEnd`, makeTaskCard(it))
  );
};

const filterContainer = document.querySelector(`.main__filter`);
Filters.forEach(([first, second]) =>
  filterContainer.insertAdjacentHTML(`beforeEnd`, makeFilterElement(first, second)));

const boardTasksContainer = document.querySelector(`.board__tasks`);

insertTaskCards(TASKS_AMOUNT_INITIAL);

filterContainer.addEventListener(`click`, () => {

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  insertTaskCards(getRandomInt(1, 10));
});
