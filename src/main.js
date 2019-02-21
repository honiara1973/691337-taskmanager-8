'use strict';
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

const getFilterElement = (caption, amount = 0, isChecked = false) => {
  return `
   <input
   type="radio" id="filter__${caption.toLowerCase()}" class="filter__input visually-hidden"
   name="filter" ${isChecked ? ` checked` : ``}>
   <label for="filter__${caption.toLowerCase()}" class="filter__label">
   ${caption.toUpperCase()} <span class="filter__${caption.toLowerCase()}-count">${amount}
   </span></label>
   `;
};

const getTaskCard = (color = `black`, text) => {
  return `
  <article
  class="card card--${color}" card--repeat>
  <form class="card__form" method="get">
  <div class="card__inner">
  <div class="card__control">
  <button type="button" class="card__btn card__btn--edit">
  edit</button>
  <button type="button" class="card__btn card__btn--archive">
  archive</button>
  <button
  type="button"
  class="card__btn card__btn--favorites card__btn--disabled">
  favorites</button>
  </div>
  <div class="card__color-bar">
  <svg class="card__color-bar-wave" width="100%" height="10">
  <use xlink:href="#wave"></use>
  </svg></div>
  <div class="card__textarea-wrap">
  <label>
  <textarea class="card__text"
  placeholder="Start typing your text here..."
  name="text">${text}</textarea>
  </label></div>
  <div class="card__settings">
  <div class="card__details">
  <div class="card__dates">
  <button class="card__date-deadline-toggle" type="button">
  date: <span class="card__date-status">no</span>
  </button>
  <fieldset class="card__date-deadline" disabled>
  <label class="card__input-deadline-wrap">
  <input
  class="card__date"
  type="text"
  placeholder="23 September"
  name="date"></label>
  <label class="card__input-deadline-wrap">
  <input class="card__time"
  type="text"
  placeholder="11:15 PM"
  name="time"></label></fieldset>
  <button class="card__repeat-toggle" type="button">
  repeat:<span class="card__repeat-status">no</span></button>
  <fieldset class="card__repeat-days" disabled>
  <div class="card__repeat-days-inner">
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-mo-5"
  name="repeat"
  value="mo">
  <label class="card__repeat-day" for="repeat-mo-5">mo</label>
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-tu-5"
  name="repeat"
  value="tu"
  checked>
  <label class="card__repeat-day" for="repeat-tu-5">tu</label>
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-we-5"
  name="repeat"
  value="we">
  <label class="card__repeat-day" for="repeat-we-5">we</label>
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-th-5"
  name="repeat"
  value="th">
  <label class="card__repeat-day" for="repeat-th-5">th</label>
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-fr-5"
  name="repeat"
  value="fr"
  checked>
  <label class="card__repeat-day" for="repeat-fr-5">fr</label>
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  name="repeat"
  value="sa"
  id="repeat-sa-5">
  <label class="card__repeat-day" for="repeat-sa-5">sa</label>
  <input
  class="visually-hidden card__repeat-day-input"
  type="checkbox"
  id="repeat-su-5"
  name="repeat"
  value="su"
  checked>
  <label class="card__repeat-day" for="repeat-su-5">su</label>
  </div></fieldset></div>
  <div class="card__hashtag">
  <div class="card__hashtag-list">
  <span class="card__hashtag-inner">
  <input
  type="hidden"
  name="hashtag"
  value="repeat"
  class="card__hashtag-hidden-input">
  <button type="button" class="card__hashtag-name">
  #repeat</button>
  <button type="button" class="card__hashtag-delete">
  delete</button>
  </span>
  <span class="card__hashtag-inner">
  <input
  type="hidden"
  name="hashtag"
  value="repeat"
  class="card__hashtag-hidden-input">
  <button type="button" class="card__hashtag-name">
  #cinema</button>
  <button type="button" class="card__hashtag-delete">
  delete</button>
  </span>
  <span class="card__hashtag-inner">
  <input
  type="hidden"
  name="hashtag"
  value="repeat"
  class="card__hashtag-hidden-input">
  <button type="button" class="card__hashtag-name">
  #entertaiment</button>
  <button type="button" class="card__hashtag-delete">
  delete</button>
  </span></div>
  <label>
  <input
  type="text"
  class="card__hashtag-input"
  name="hashtag-input"
  placeholder="Type new hashtag here">
  </label>
  </div></div>
  <label class="card__img-wrap card__img-wrap--empty">
  <input
  type="file"
  class="card__img-input visually-hidden"
  name="img">
  <img
  src="img/add-photo.svg"
  alt="task picture"
  class="card__img">
  </label>
  <div class="card__colors-inner">
  <h3 class="card__colors-title">Color</h3>
  <div class="card__colors-wrap">
  <input
  type="radio"
  id="color-black-5"
  class="card__color-input card__color-input--black visually-hidden"
  name="color"
  value="black">
  <label
  for="color-black-5"
  class="card__color card__color--black">black</label>
  <input
  type="radio"
  id="color-yellow-5"
  class="card__color-input card__color-input--yellow visually-hidden"
  name="color"
  value="yellow">
  <label
  for="color-yellow-5"
  class="card__color card__color--yellow">yellow</label>
  <input
  type="radio"
  id="color-blue-5"
  class="card__color-input card__color-input--blue visually-hidden"
  name="color"
  value="blue">
  <label
  for="color-blue-5"
  class="card__color card__color--blue">blue</label>
  <input
  type="radio"
  id="color-green-5"
  class="card__color-input card__color-input--green visually-hidden"
  name="color"
  value="green"
  checked>
  <label
  for="color-green-5"
  class="card__color card__color--green">green</label>
  <input
  type="radio"
  id="color-pink-5"
  class="card__color-input card__color-input--pink visually-hidden"
  name="color"
  value="pink">
  <label
  for="color-pink-5"
  class="card__color card__color--pink">pink</label>
  </div>
  </div>
  </div>
  <div class="card__status-btns">
  <button class="card__save" type="submit">save</button>
  <button class="card__delete" type="button">delete</button>
  </div>
  </div>
  </form>
  </article>
  `;
};

const filterContainer = document.querySelector(`.main__filter`);
Filters.forEach(([first, second]) =>
  filterContainer.insertAdjacentHTML(`beforeEnd`, getFilterElement(first, second)));

const boardTasksContainer = document.querySelector(`.board__tasks`);

const insertTaskCards = (amount) => {

  for (let i = 0; i < amount; i++) {
    const randomCard = getRandomElement(TaskCards);
    boardTasksContainer.insertAdjacentHTML(`beforeEnd`,
        getTaskCard(randomCard.color, randomCard.text));
  }

};

insertTaskCards(TASKS_AMOUNT_INITIAL);

filterContainer.addEventListener(`click`, () => {

  while (boardTasksContainer.firstChild) {
    boardTasksContainer.removeChild(boardTasksContainer.firstChild);
  }

  insertTaskCards(getRandomInt(1, 10));
});
