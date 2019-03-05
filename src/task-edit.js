import createTaskElement from './make-task';
import {compareRandom, getRandomInt} from './utils';


class TaskEdit {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._colors = data.colors;
    this._color = data.color;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._element = null;
    this._onSubmit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    typeof this._onSubmit === `function` && this._onSubmit();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
      <article
      class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
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
      name="text">${this._title}</textarea>
      </label></div>
      <div class="card__settings">
      <div class="card__details">
      <div class="card__dates">
      <button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">yes</span>
      </button>
      <fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
      <input
      class="card__date"
      type="text"
      placeholder="23 September"
      name="date"
      value="${`${this._dueDate}`.substr(4, 6)}"></label>
      <label class="card__input-deadline-wrap">
      <input class="card__time"
      type="text"
      placeholder="11:15 PM"
      name="time"
      value="${`${this._dueDate}`.substr(16, 5)}">
      </label></fieldset>

      <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">yes</span></button>

      <fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
      ${Object.entries(this._repeatingDays)
        .map(([key, value]) =>
          `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${key}-5"
        name="repeat"
        value="${key}"
        ${value ? `checked` : ``}>
        <label class="card__repeat-day" for="repeat-mo-5">${key}</label>
        `)
      .join(``)}
      </div>
      </fieldset>

      </div>
      <div class="card__hashtag">
      <div class="card__hashtag-list">
      ${[...this._tags]
        .slice()
        .sort(compareRandom)
        .slice(0, getRandomInt(0, 3))
        .map((it) => `
        <span class="card__hashtag-inner">
        <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input">
        <button type="button" class="card__hashtag-name">
        ${it}</button>
        <button type="button" class="card__hashtag-delete">
        delete</button>
        </span>`
        )
        .join(` `)}
      </div>
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
      src="${this._picture}"
      alt="task picture"
      class="card__img">
      </label>
      <div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">

      ${this._colors
      .map((it) =>
        `<input
      type="radio"
      id="color-${it}-5"
      class="card__color-input card__color-input--${it} visually-hidden"
      name="color"
      value="${it}"
      ${it === this._color ? `checked` : ``}>
      <label
      for="color-${it}-5"
      class="card__color card__color--${it}">${it}</label>`
      )
    .join(``)}
      
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
      `.trim();
  }

  render() {
    this._element = createTaskElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__form`).
      addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__form`).
      removeEventListener(`submit`, this._onSubmitButtonClick);
  }

  update() {
    return this._state.isEdit ?
      this._element.classList.add(`card--edit`) :
      this._element.classList.remove(`card--edit`);
  }

}

export default TaskEdit;
