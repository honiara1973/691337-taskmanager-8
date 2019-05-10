import * as moment from 'moment';

import API from './api';
// import getTasks from './task-data';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import getFilters from './filter-data';
import renderStats from './stats-controller';

// const TASKS_AMOUNT_INITIAL = 7;
const allFilters = getFilters();
// const taskCards = getTasks(TASKS_AMOUNT_INITIAL);
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

/*
const updatedData = {
  date: ``,
};
*/
let allTasks;

const filterContainer = document.querySelector(`.main__filter`);
const boardTasksContainer = document.querySelector(`.board__tasks`);
const statsControl = document.querySelector(`#control__statistic`);
const taskControl = document.querySelector(`#control__task`);
const statsContainer = document.querySelector(`.statistic`);

const deleteCard = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

/*
const updateCard = (tasks, i, newCard) => {
  tasks[i] = Object.assign({}, tasks[i], newCard);
  return tasks[i];
};
*/

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return tasks;
    case `filter__overdue`:
      return tasks.filter((it) => it.dueDate < Date.now());
    case `filter__today`:
      return tasks.filter((it) =>
        moment(it.dueDate).format(`DD MMMM`) === moment().format(`DD MMMM`));
    case `filter__favorites`:
      return tasks.filter((it) => it.color === `pink`);
    case `filter__repeating`:
      return tasks.filter((it) =>
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
      data.title = newObject.title;
      data.dueDate = newObject.dueDate;
      data.color = newObject.color;
      data.tags = newObject.tags;
      data.repeatingDays = newObject.repeatingDays;

      // const updatedCard = updateCard(tasks, i, newObject);
    
      // console.log(typeof updatedCard);
      // console.log(typeof data);
      // console.log(updatedCard.id);
      // console.log(data);
      // console.log(updatedCard);
      api.updateTask({id: data.id, data: data.toRAW()})
      .then((newData) => {
        // const updatedCard = updateCard(tasks, i, newObject);
        taskCard.update(newData);
        taskCard.render();
        boardTasksContainer.replaceChild(taskCard.element, taskCardEdit.element);
        taskCardEdit.unrender();
        // updatedData.date = updatedCard.dueDate.date;
      });
    };

    taskCardEdit.onDelete = () => {
      deleteCard(tasks, i);
      taskCardEdit.unrender();
    };

    boardTasksContainer.appendChild(taskCard.render());
  }
};

createFilterElements();
// getTaskCards(taskCards);

api.getTasks()
.then((it) => {
  allTasks = it;
  console.log(allTasks);
  getTaskCards(allTasks);
});


filterContainer.addEventListener(`change`, (evt) => {
  const filterName = evt.target.id;
  // console.log(filterName);

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  const filteredTasks = filterTasks(allTasks, filterName);
  // console.log(filteredTasks);
  getTaskCards(filteredTasks);

  // getTaskCards(taskCards);
});

statsControl.addEventListener(`click`, () => {

  statsContainer.classList.remove(`visually-hidden`);
  boardTasksContainer.classList.add(`visually-hidden`);

  while (statsContainer.firstChild) {
    statsContainer.removeChild(statsContainer.firstChild);
  }
  renderStats(allTasks);

});

taskControl.addEventListener(`click`, () => {
  boardTasksContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);

});

