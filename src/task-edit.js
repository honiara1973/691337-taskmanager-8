import Component from './component';
import * as moment from 'moment';

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._colors = data.colors;
    this._color = data.color;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._onSubmit = null;
    this._state.isDate = false;
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    // Нужен ли bind для color? Вроде и так всё работает.
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      dueDate: ``,
      color: ``,
      tags: this._tags,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      },
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }
  _onChangeColor(evt) {
    this._color = evt.target.value;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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
      date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
      </button>
      <fieldset class="card__date-deadline" ${!this._state.isDate ? `disabled` : ``}>
      <label class="card__input-deadline-wrap">
      <input
      class="card__date"
      type="text"
      placeholder="23 September"
      name="date"
      value="${moment(this._dueDate).format(`ll`)}"></label>
      <label class="card__input-deadline-wrap">
      <input class="card__time"
      type="text"
      placeholder="11:15 PM"
      name="time"
      value="${moment(this._dueDate).format(`LT`)}">
      </label></fieldset>

      <button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">
      ${this._isRepeated() ? `yes` : `no`}
      </span></button>

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
        <label class="card__repeat-day" for="repeat-${key}-5">${key}</label>
        `)
      .join(``)}
      </div>
      </fieldset>

      </div>
      <div class="card__hashtag">
      <div class="card__hashtag-list">
      ${[...this._tags]
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

  createListeners() {
    this._element.querySelector(`.card__form`).
      addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`).
     addEventListener(`click`, this._onChangeColor);
    this._element.querySelector(`.card__date-deadline-toggle`).
    addEventListener(`click`, this._onChangeDate);
  }

  removeListeners() {
    this._element.querySelector(`.card__form`).
      removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`).
    removeEventListener(`click`, this._onChangeColor);
    this._element.querySelector(`.card__date-deadline-toggle`).
    removeEventListener(`click`, this._onChangeDate);
  }

  update(data) {
    this._title = data.title;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._tags = data.tags;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => (target.dueDate = moment(value)),
      [`hashtag-input`]: (value) => {
        if (value.length > 0) {
          value.split(` `).forEach((it) => target.tags.add(it));
        }
      },
    };
  }

}

export default TaskEdit;
