import {$} from '@core/dom';

export function resizeHandeler($root, event) {
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
      $resizer.css({

      });
      $resizer.css({
        right: -delta + 'px'
      });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      console.log(value);
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
  };
}
