import makeFilterElement from './make-filter';
import task from './task-data';
import makeTaskCard from './make-task';

import {getRandomInt} from './utils';

const TASKS_AMOUNT_INITIAL = 7;

const Filters = [
  [`All`, 15], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const createTaskCards = (amount) => {
  const taskCards = [];

  for (let i = 0; i < amount; i++) {
    taskCards.push(makeTaskCard(task));
  }

  return taskCards;
};

const filterContainer = document.querySelector(`.main__filter`);
Filters.forEach(([first, second]) =>
  filterContainer.insertAdjacentHTML(`beforeEnd`, makeFilterElement(first, second)));

const boardTasksContainer = document.querySelector(`.board__tasks`);

const insertTaskCards = (amount) => {
  const taskCards = createTaskCards(amount);
  taskCards.map((it) => boardTasksContainer.insertAdjacentHTML(`beforeEnd`, it));
};

insertTaskCards(TASKS_AMOUNT_INITIAL);

filterContainer.addEventListener(`click`, () => {

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  insertTaskCards(getRandomInt(1, 10));
});
