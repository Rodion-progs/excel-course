import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emmiter = options.emmiter;
    this.unsubscribes = [];
    this.prepare();
  }
  // Настраиваем наш компонент до init
  prepare() {}
  // Возвращаем шаблон компонента
  toHTML() {
    return '';
  }
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emmiter.emit(event, ...args);
  }
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn);
    this.unsubscribes.push(unsub);
  }
  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDomListeners();
  }
  // Удаляем компонент
  // чистим слушателей
  destroy() {
    this.removeDomListeners();
    this.unsubscribes.forEach((unsub) => unsub());
  }
}
