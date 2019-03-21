import makeFilterElement from './make-filter';
import getTasks from './task-data';
import Task from './task';
import TaskEdit from './task-edit';

const TASKS_AMOUNT_INITIAL = 7;
const taskCards = getTasks(TASKS_AMOUNT_INITIAL);

const Filters = [
  [`All`, 15], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const deleteCard = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const updateCard = (tasks, i, newCard) => {
  tasks[i] = Object.assign({}, tasks[i], newCard);
  return tasks[i];
};

const filterContainer = document.querySelector(`.main__filter`);
Filters.forEach(([first, second]) =>
  filterContainer.insertAdjacentHTML(`beforeEnd`, makeFilterElement(first, second)));

const boardTasksContainer = document.querySelector(`.board__tasks`);

const getTaskCards = (tasks) => {

  for (let i = 0; i < tasks.length; i++) {
    const data = tasks[i];
    const taskCard = new Task(data);
    const taskCardEdit = new TaskEdit(data);

    taskCard.onEdit = () => {
      taskCardEdit.render();
      boardTasksContainer.replaceChild(taskCardEdit.element, taskCard.element);
      taskCard.unrender();
    };

    taskCardEdit.onSubmit = (newObject) => {
      const updatedCard = updateCard(tasks, i, newObject);
      taskCard.update(updatedCard);
      taskCard.render();
      boardTasksContainer.replaceChild(taskCard.element, taskCardEdit.element);
      taskCardEdit.unrender();
    };

    taskCardEdit.onDelete = () => {
      deleteCard(tasks, i);
      taskCardEdit.unrender();
    };

    boardTasksContainer.appendChild(taskCard.render());
  }
};

getTaskCards(taskCards);

filterContainer.addEventListener(`click`, () => {

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  getTaskCards(taskCards);
});
