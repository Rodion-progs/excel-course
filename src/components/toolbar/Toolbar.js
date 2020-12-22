import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static ClassName = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: [],
      ...options
    });
  }
  toHTML() {
    return `
        <div class="toolbar__button">
            <i class="material-icons">format_align_left</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_align_center</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_align_right</i>
        </div>
        <div class="header__button">
            <i class="material-icons">format_bold</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_italic</i>
        </div>
        <div class="toolbar__button">
            <i class="material-icons">format_underline</i>
        </div>
      `;
  }
}