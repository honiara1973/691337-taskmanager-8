export default (caption, amount = 0, isChecked = false) => {
  return `
     <input
     type="radio" id="filter__${caption.toLowerCase()}" class="filter__input visually-hidden"
     name="filter" ${isChecked ? ` checked` : ``}>
     <label for="filter__${caption.toLowerCase()}" class="filter__label">
     ${caption.toUpperCase()} <span class="filter__${caption.toLowerCase()}-count">${amount}
     </span></label>
     `;
};
