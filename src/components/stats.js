import AbstractSmartComponent from './abstract-smart-component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TRANSFER_TYPES, BAR_HEIGHT, ChartTitle, chartIconsMap} from '../data/const';
import {getTimeDifference} from '../utils/common';

const getStatsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

const getCurrentEventTypes = (events) => {
  return events
    .map((event) => event.type)
    .filter((item, index, array) => array.indexOf(item) === index);
};

const getChartOptions = (title, types, data, formatter) => {
  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data,
        backgroundColor: `#fff`,
        hoverBackgroundColor: `#fff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000`,
          anchor: `end`,
          align: `start`,
          formatter
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        barThickness: 44,
        minBarLength: 50,
        yAxes: [{
          ticks: {
            fontColor: `#000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${chartIconsMap[type]}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  };
};

const renderMoneyChart = (chartCtx, events) => {
  const types = getCurrentEventTypes(events);
  const data = types.map((type) => {
    return events.reduce((total, event) => (event.type === type) ? total + event.price : total, 0);
  });
  const formatter = (val) => `€ ${val}`;

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, getChartOptions(ChartTitle.MONEY, types, data, formatter));
};

const renderTransportChart = (chartCtx, events) => {
  const types = getCurrentEventTypes(events).filter((type) => TRANSFER_TYPES.includes(type));
  const data = types.map((type) => {
    return events.filter((event) => event.type === type).length;
  });
  const formatter = (val) => `${val}x`;

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, getChartOptions(ChartTitle.TRANSPORT, types, data, formatter));
};

const renderTimeSpentChart = (chartCtx, events) => {
  const types = getCurrentEventTypes(events);
  const data = types.map((type) => {
    return events.reduce((total, event) => (event.type === type) ? total + getTimeDifference(event, `hours`) : total, 0);
  });
  const formatter = (val) => `${val}H`;

  chartCtx.height = BAR_HEIGHT * types.length;

  return new Chart(chartCtx, getChartOptions(ChartTitle.TIME_SPENT, types, data, formatter));
};

export default class Stats extends AbstractSmartComponent {
  constructor(events) {
    super();

    this._events = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return getStatsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._events);
  }

  recoverListeners() {

  }

  rerender(events) {
    this._events = events;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const events = this._events.getEvents();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, events);
    this._transportChart = renderTransportChart(transportCtx, events);
    this._timeSpentChart = renderTimeSpentChart(timeSpentCtx, events);
  }

  _resetCharts() {
    this._resetChart(this._moneyChart);
    this._resetChart(this._transportChart);
    this._resetChart(this._timeSpentChart);
  }

  _resetChart(chart) {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  }
}
