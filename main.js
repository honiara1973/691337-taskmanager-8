const Filters = [
  ['All', 15], ['Overdue', 0], ['Today', 0], ['Favorites', 7],
  ['Repeating', 2], ['Tags', 6], ['Archive', 115]
];

const getFilterElement = (caption, amount=0, isChecked=false) => {
   return `
   <input
   type="radio" id="filter__${caption.toLowerCase()}" class="filter__input visually-hidden"
   name="filter" ${isChecked ? " checked" : ""}>
   <label for="filter__${caption.toLowerCase()}" class="filter__label">
   ${caption.toUpperCase()} <span class="filter__${caption.toLowerCase()}-count">${amount}
   </span></label>
   `;
};

/* не дописано
Filters.forEach(([first, second]) => getFilterElement(first, second));
*/

const getTaskCard = (color='black', repeat=false) => {
  return `
  <article
  class="card card--${color}">
  <form class="card__form" method="get">
  <div class="card__inner">

  <div class="card__color-bar">
  <svg class="card__color-bar-wave" width="100%" height="10">
  <use xlink:href="#wave"></use>
  </svg>
  </div>

  <div class="card__textarea-wrap">
  <label>
  <textarea class="card__text"
  placeholder="Start typing your text here..."
  name="text">Here is a card with filled data</textarea>
  </label>
  </div>
  `
};

/*<article class="card card--edit card--yellow card--repeat">
<article class="card card--yellow card--deadline">
<article class="card card--pink card--repeat">
<article class="card card--edit card--black">
<article class="card card--blue">
*/


