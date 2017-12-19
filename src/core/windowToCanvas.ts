/**
 * 将window坐标转化为canvas坐标
 * @param {HTMLCanvasElement} canvas canvas元素
 * @param {number} x x坐标
 * @param {number} y y坐标
 */
export default function windowToCanvas(canvas:HTMLCanvasElement, x:number, y:number) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round((x - rect.left) * (canvas.width / rect.width)),
    y: Math.round((y - rect.top) * (canvas.height / rect.height))
  };
}
