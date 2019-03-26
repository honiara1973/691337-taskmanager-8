// import makeFilterElement from './make-filter';
import * as moment from 'moment';

import getTasks from './task-data';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import getFilters from './filter-data';

const TASKS_AMOUNT_INITIAL = 7;
const allFilters = getFilters();
const taskCards = getTasks(TASKS_AMOUNT_INITIAL);

const updatedData = {
  date: ``,
};

const filterContainer = document.querySelector(`.main__filter`);
const boardTasksContainer = document.querySelector(`.board__tasks`);

const deleteCard = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const updateCard = (tasks, i, newCard) => {
  tasks[i] = Object.assign({}, tasks[i], newCard);
  return tasks[i];
};

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return taskCards;
    case `filter__overdue`:
      return taskCards.filter((it) => it.dueDate.date < Date.now());
    case `filter__today`:
      return taskCards.filter((it) =>
        moment(it.dueDate.date).format(`DD MMMM`) === (moment().format(`DD MMMM`)));
    case `filter__favorites`:
      return taskCards.filter((it) => it.color === `pink`);
    case `filter__repeating`:
      return taskCards.filter((it) =>
        Object.values(it.repeatingDays).some((el) => el === true));
    default:
      return [];
  }

};

const renderFilter = (data) => {
  const filter = new Filter(data);
  filterContainer.appendChild(filter.render());
};

const createFilterElements = () => {
  allFilters.forEach((it) => renderFilter(it));
};

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
      updatedData.date = updatedCard.dueDate.date;
    };

    taskCardEdit.onDelete = () => {
      deleteCard(tasks, i);
      taskCardEdit.unrender();
    };

    boardTasksContainer.appendChild(taskCard.render());
  }
};

createFilterElements();
getTaskCards(taskCards);


filterContainer.addEventListener(`change`, (evt) => {
  const filterName = evt.target.id;

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  const filteredTasks = filterTasks(taskCards, filterName);
  getTaskCards(filteredTasks);

  // getTaskCards(taskCards);
});
