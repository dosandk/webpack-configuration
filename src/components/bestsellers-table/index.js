import SortableTable from '../sortable-table/index.js';

export const header = [
  {
    id: 'images',
    title: 'Image',
    sortable: false,
    template: data => {
      return `
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${data[0].url}">
        </div>
      `;
    }
  },
  {
    id: 'title',
    title: 'Name',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'quantity',
    title: 'Quantity',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'sales',
    title: 'Sales',
    sortable: true,
    sortType: 'number'
  },
];

class BestsellersTable extends SortableTable {
  constructor(...options) {
    super(header, ...options);
  }
}

export default BestsellersTable;
