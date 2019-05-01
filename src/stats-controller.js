import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Stats from './stats';
import chartOptions from './chart-opt';

const statsContainer = document.querySelector(`.statistic`);

const statsCounters = {
  colors: ``,
  hashTags: ``,
  colorToRGB: {
    pink: `#ff3cb9`,
    yellow: `#ffe125`,
    blue: `#0c5cdd`,
    black: `#000000`,
    green: `#31b55c`,
  },
};

/*
const statsCounters = {
  color: {
    pink: 0,
    yellow: 0,
    blue: 0,
    black: 0,
    green: 0,
  },

  hashTags: ``,
};
*/
const getLabelsColor = (arr) => {
  // const labels = map.keys();

  console.log(statsCounters.colorToRGB);

  const changeColorToRgb = (color) => {
    return Object.entries(statsCounters.colorToRGB)
    .reduce((acc, [key, value]) => key === color ? value : acc, ``);
  };

  const labelColors = arr.map((it) => changeColorToRgb(it));
  return labelColors;
};

// console.log(getLabelsColor([...statsCounters.colors.keys()]));


const getStatsCounters = (array) => {
/*
  const countColor = (element) => {
    statsCounters.color[element] =
    array.reduce((acc, it) => it.color === element ? acc + 1 : acc, 0);
    return statsCounters.color[element];
  };
  Object.keys(statsCounters.color).forEach((it) => countColor(it));
*/

  const getColorsMap = (cards) => {
    const allColors = cards.reduce((acc, it) => [...acc].concat(it.color), []);
    const count = (currentEl) => allColors.reduce((acc, it) => it === currentEl ?
      acc + 1 : acc, 0);
    const colorsMap = new Map();

    allColors.forEach((it) => colorsMap.set(it, count(it)));

    return colorsMap;
  };
  statsCounters.colors = getColorsMap(array);

  /*
  const getLabelsColor = (arr) => {
    // const labels = map.keys();

    console.log(statsCounters.colorToRGB);

    const changeColorToRgb = (color) => {
      return Object.entries(statsCounters.colorToRGB)
      .reduce((acc, [key, value]) => key === color ? value : acc, ``);
    };

    const labelColors = arr.map((it) => changeColorToRgb(it));
    return labelColors;
  };

   console.log(getLabelsColor([...statsCounters.colors.keys()]));
*/

  const getHashTagsMap = (cards) => {
    const allHashTags = cards.reduce((acc, it) => [...acc].concat([...it.tags]), []);
    const count = (currentEl) => allHashTags.reduce((acc, it) => it === currentEl ?
      acc + 1 : acc, 0);
    const hashTagsMap = new Map();
    allHashTags.forEach((it) => hashTagsMap.set(it, count(it)));

    return hashTagsMap;
  };
  statsCounters.hashTags = getHashTagsMap(array);
};

const updateChartData = (chart) => {
  chart.data.labels = [...statsCounters].hashTags.keys();
  chart.data.datasets[0].data = [...statsCounters].hashTags.values();
  chart.update();
};

const renderStats = (data) => {

  getStatsCounters(data);

  const stats = new Stats(data);
  statsContainer.appendChild(stats.render());

  document.querySelector(`.statistic__tags-wrap`).classList.remove(`visually-hidden`);
  document.querySelector(`.statistic__colors-wrap`).classList.remove(`visually-hidden`);
  const tagsCtx = document.querySelector(`.statistic__tags`);
  const colorsCtx = document.querySelector(`.statistic__colors`);

  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [...statsCounters.hashTags.keys()],
      datasets: [{
        data: [...statsCounters.hashTags.values()],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: chartOptions(`TAGS`),
  });

  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [...statsCounters.colors.keys()],
      // labels: [...Object.keys(statsCounters.color)],
      datasets: [{
        data: [...statsCounters.colors.values()],
        // data: [...Object.values(statsCounters.color)],
        backgroundColor: getLabelsColor([...statsCounters.colors.keys()])
        // backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: chartOptions(`COLORS`),
  });

  tagsCtx.innerHTML = tagsChart;
  colorsCtx.innerHTML = colorsChart;
};

export default renderStats;
