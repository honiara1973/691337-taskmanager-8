const Filters = [
  [`All`, 15, true], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const getFilters = () => {

  const filters = [];

  for (let el of Filters) {
    const [caption, counter, isActive = false] = el;

    const filter = {
      caption,
      counter,
      isActive,
    };

    filters.push(filter);
  }
console.log(filters);
  return filters;
};

export default getFilters;
