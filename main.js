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

const getTaskCard = (edit=true, color='black', repeat=false) => {

}

/*<article class="card card--edit card--yellow card--repeat">
<article class="card card--yellow card--deadline">
<article class="card card--pink card--repeat">
<article class="card card--edit card--black">
<article class="card card--blue">
*/


