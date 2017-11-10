export default function windowToCanvas(canvas:HTMLCanvasElement, x:number, y:number) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (x - rect.left) * (canvas.width / rect.width),
    y: (y - rect.top) * (canvas.height / rect.height)
  };
}
