import Component from './component';
import * as moment from 'moment';

class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._color = data.color;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
      <article
      class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
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
      <fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
      <input
      class="card__date"
      type="text"
      placeholder=""
      name="date"
      value="${moment(this._dueDate.date).isValid() ?
    `${moment(this._dueDate.date).format(`DD MMMM`)}` : ``}
     ${moment(this._dueDate.time).isValid() ?
    `${moment(this._dueDate.time).format(`hh:mm`)}` : ``}">
      </label>
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
        </span>`
        )
        .join(` `)}
      </div>
      </div></div>
      </div>
      </div>
      </form>
      </article>
      `.trim();
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`)
    .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`)
    .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._tags = data.tags;
    this._dueDate = data.dueDate;
  }

}

export default Task;
