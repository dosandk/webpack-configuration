import Tooltip from './components/tooltip/index.js';
import RangePicker from './components/range-picker/index.js';
import SortableTable, {header} from './components/sortable-table/index.js';

import { generateRandomNumber, getDiffDays, getFakeDate } from './utils/index.js';

Tooltip.init();

const chartsRoot = document.getElementById('charts-root');
const rangePickerRoot = document.getElementById('range-picker-root');
const sortableTableRoot = document.getElementById('sortable-table-root');

const rangePicker = new RangePicker({
  from: new Date(2019, 9, 2),
  to: new Date(2019, 10, 5)
});

rangePickerRoot.append(rangePicker.$element);

const sortableTable = new SortableTable(header);

sortableTableRoot.append(sortableTable.$element);

async function initSortableTable() {
  const response = await fetch(`${process.env.BACKEND_URL}api/dashboard/bestsellers`);
  const data = await response.json();

  sortableTable.renderTableBody(data);
}

async function initColumnCharts() {
  const {default: ColumnChart} = await import(/* webpackChunkName: "column-chart" */'./components/column-chart/index.js');

  const ordersColumnChart = new ColumnChart({
    data: getFakeDate(10),
    label: 'orders',
    value: 344,
    link: '#'
  });

  ordersColumnChart.$element.classList.add('dashboard__chart_orders');

  chartsRoot.append(ordersColumnChart.$element);

  const salesColumnChart = new ColumnChart({
    data: getFakeDate(10),
    label: 'sales',
    value: '$243,437'
  });

  salesColumnChart.$element.classList.add('dashboard__chart_sales');

  chartsRoot.append(salesColumnChart.$element);

  const customerColumnChart = new ColumnChart({
    data: getFakeDate(10),
    label: 'customers',
    value: 321
  });

  customerColumnChart.$element.classList.add('dashboard__chart_customers');

  chartsRoot.append(customerColumnChart.$element);

  rangePicker.$element.addEventListener('date-select', event => {
    const {from, to} = event.detail;
    const diffDays = getDiffDays(from, to);
    const getFakeColumnChartData = () => {
      return {
        headerData: generateRandomNumber(10, 30),
        bodyData: getFakeDate(diffDays)
      };
    };

    ordersColumnChart.update(getFakeColumnChartData());
    salesColumnChart.update(getFakeColumnChartData());
    customerColumnChart.update(getFakeColumnChartData());
  });
}

initColumnCharts();
initSortableTable();


