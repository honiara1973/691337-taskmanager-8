const Filters = [
  [`All`, 15], [`Overdue`, 0], [`Today`, 0], [`Favorites`, 7],
  [`Repeating`, 2], [`Tags`, 6], [`Archive`, 115]
];

const getFilters = () => {

  const filters = [];

  for (let el of Filters) {
    const [caption, counter] = el;

    const filter = {
      caption,
      counter,
    };

    filters.push(filter);
  }

  return filters;
};

export default getFilters;
