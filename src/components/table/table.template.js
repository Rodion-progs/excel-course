const CODES = {
  A: 65,
  Z: 90
};

function toCell(row, col) {
  return `
   <div 
   class="table-cell" 
   contenteditable 
   data-col="${col}"
   data-type="cell"
   data-id="${row}:${col}">
   </div>
   `;
}

function toColumn(col, index) {
  return `
   <div class="table-column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
   </div>
   `;
}

function createRow(index, content) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="table-row" data-type="resizable">
        <div class="table-row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="table-row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCounts = 150) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCounts; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, col) => toCell(row, col))
        .join('');
    rows.push(createRow(row + 1, cells));
  }
  return rows.join('');
}