// import makeFilterElement from './make-filter';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';

import API from './api';
// import getTasks from './task-data';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import getFilters from './filter-data';
import Stats from './stats';
import chartOptions from './chart-opt';

// const TASKS_AMOUNT_INITIAL = 7;
const allFilters = getFilters();
// const taskCards = getTasks(TASKS_AMOUNT_INITIAL);
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const updatedData = {
  date: ``,
};
let allTasks;

const statsCounters = {
  color: {
    pink: 0,
    yellow: 0,
    blue: 0,
    black: 0,
    green: 0,
  },

  hashTags: ``,
};

const filterContainer = document.querySelector(`.main__filter`);
const boardTasksContainer = document.querySelector(`.board__tasks`);
const statsControl = document.querySelector(`#control__statistic`);
const taskControl = document.querySelector(`#control__task`);
const statsContainer = document.querySelector(`.statistic`);

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

const renderStats = (data) => {

  const countColor = (element) => {
    statsCounters.color[element] =
    allTasks.reduce((acc, it) => it.color === element ? acc + 1 : acc, 0);
    return statsCounters.color[element];
  };

  Object.keys(statsCounters.color).forEach((it) => countColor(it));
  // console.log(statsCounters.color);

  const getHashTagsArray = (cards) => {
    let hashTagsArray = [];

    hashTagsArray = cards.reduce((acc, it) => [...acc].concat([...it.tags]), hashTagsArray);
    //const hashTagsSet = new Set(hashTagsArray);

    const count = (currentEl) => hashTagsArray.reduce((acc, it) => it === currentEl ?
      acc + 1 : acc, 0);
    const hashTagsMap = new Map();
    hashTagsArray.forEach((it) => hashTagsMap.set(it, count(it)));

    return hashTagsMap;

  };

  statsCounters.hashTags = getHashTagsArray(allTasks);

  console.log(getHashTagsArray(allTasks));
  console.log(statsCounters.hashTags);

  const stats = new Stats(data);
  statsContainer.appendChild(stats.render());

  document.querySelector(`.statistic__tags-wrap`).classList.remove(`visually-hidden`);
  document.querySelector(`.statistic__colors-wrap`).classList.remove(`visually-hidden`);
  const tagsCtx = document.querySelector(`.statistic__tags`);
  const colorsCtx = document.querySelector(`.statistic__colors`);

  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [...statsCounters.hashTags.keys()],
      datasets: [{
        data: [...statsCounters.hashTags.values()],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: chartOptions(`TAGS`),
  });

  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [...Object.keys(statsCounters.color)],
      datasets: [{
        data: [...Object.values(statsCounters.color)],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: chartOptions(`COLORS`),
  });

  tagsCtx.innerHTML = tagsChart;
  colorsCtx.innerHTML = colorsChart;
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
  renderStats();

});

taskControl.addEventListener(`click`, () => {
  boardTasksContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);

});

