import {$} from '@core/dom';

export function resizeHandeler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'height' : 'width';
    let value;
    $resizer.css({
      opacity: 1,
      [sideProp]: '5000px',
    });
    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        value = value >= 20 ? value : 20;
        $resizer.css({
          right: -delta + 'px'
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        value = value >= 5 ? value : 5;
        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $parent.css({width: value + 'px'});
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => el.style.width = value + 'px');
        $resizer.css({
          opacity: 0,
          height: '100%',
          right: 0
        });
      } else {
        $parent.css({height: value + 'px'});
        $resizer.css({
          bottom: 0,
          opacity: 0,
          width: '100%'
        });
      }
      resolve({
        value,
        type,
        id: $parent.data[type]
      });
    };
  });
}
