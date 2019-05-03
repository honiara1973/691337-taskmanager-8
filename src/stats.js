import * as moment from 'moment';
import flatpickr from 'flatpickr';

import Component from './component';

class Stats extends Component {
  constructor() {
    super();
    this._onPeriod = null;
    this._onPeriodChange = this._onPeriodChange.bind(this);
  }

  _onInputPeriod(evt) {
    const element = evt.target;
    flatpickr(element, {mode: `range`, altInput: true,
      altFormat: `j M`, dateFormat: `j M`, locale: {rangeSeparator: ` - `}});
  }

  _onPeriodChange() {
    if (typeof this._onPeriod === `function`) {
      this._onPeriod();
    }
  }

  set onPeriod(fn) {
    this._onPeriod = fn;
  }

  get template() {
    return `
    <div>
        <div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="01 Feb - 08 Feb"
                value="${moment().startOf(`week`)
                .format(`D MMM`)} - ${moment().endOf(`week`)
                .format(`D MMM`)}"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">0</span> tasks were fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic visually-hidden">
            <canvas class="statistic__days" width="550" height="150"></canvas>
          </div>
        </div>

        <div class="statistic__circle">
          <div class="statistic__tags-wrap visually-hidden">
            <canvas class="statistic__tags" width="400" height="300"></canvas>
          </div>
          <div class="statistic__colors-wrap visually-hidden">
            <canvas class="statistic__colors" width="400" height="300"></canvas>
          </div>
        </div>
        </div>
        `.trim();
  }

  createListeners() {
    this._element.querySelector(`.statistic__period-input`)
    .addEventListener(`click`, this._onInputPeriod);
    this._element.querySelector(`.statistic__period-input`)
    .addEventListener(`change`, this._onPeriodChange);
  }
}

export default Stats;
