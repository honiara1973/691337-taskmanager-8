import Component from './component';

class Filter extends Component {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._counter = data.counter;
  }

  get template() {
    return `
  <input
  type="radio" id="filter__${this._caption.toLowerCase()}" class="filter__input visually-hidden"
  name="filter"}>
  <label for="filter__${this._caption.toLowerCase()}" class="filter__label">
  ${this._caption.toUpperCase()} <span class="filter__${this._caption.toLowerCase()}-count">${this._counter}
  </span></label>
  `.trim();
  }

}

export default Filter;
