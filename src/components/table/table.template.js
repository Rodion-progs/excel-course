const CODES = {
  A: 65,
  Z: 90
};

function toCell(_, col) {
  return `
   <div class="table-cell" contenteditable data-col="${col}"></div>
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

  for (let i = 0; i < rowsCounts; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
