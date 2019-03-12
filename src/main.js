import makeFilterElement from './make-filter';
import getTasks from './task-data';
import Task from './task';
import TaskEdit from './task-edit';

import {getRandomInt} from './utils';

const TASKS_AMOUNT_INITIAL = 7;

const Filters = [
  [`All`, 15], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const filterContainer = document.querySelector(`.main__filter`);
Filters.forEach(([first, second]) =>
  filterContainer.insertAdjacentHTML(`beforeEnd`, makeFilterElement(first, second)));

const boardTasksContainer = document.querySelector(`.board__tasks`);

const renderTaskElement = (data) => {
  const taskCard = new Task(data);
  const taskCardEdit = new TaskEdit(data);

  boardTasksContainer.appendChild(taskCard.render());

  taskCard.onEdit = () => {
    taskCardEdit.render();
    boardTasksContainer.replaceChild(taskCardEdit.element, taskCard.element);
    taskCard.unrender();
  };

  taskCardEdit.onSubmit = (newObject) => {
    data.title = newObject.title;
    data.color = newObject.color;
    taskCard.update(data);
    taskCard.render();
    boardTasksContainer.replaceChild(taskCard.element, taskCardEdit.element);
    taskCardEdit.unrender();
  };
};

const getTaskCards = (amount) => {
  const taskCards = getTasks(amount);
  return taskCards.forEach((it) =>
    renderTaskElement(it));
};

getTaskCards(TASKS_AMOUNT_INITIAL);

filterContainer.addEventListener(`click`, () => {

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  getTaskCards(getRandomInt(1, 10));
});
