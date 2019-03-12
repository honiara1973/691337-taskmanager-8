import makeTaskElement from './make-task';

class Component {

  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = makeTaskElement(this.template);
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }

  createListeners() {}
  removeListeners() {}
  update() {}

}

export default Component;
