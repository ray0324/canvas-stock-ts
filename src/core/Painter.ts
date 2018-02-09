import { Point, Line } from '../types';
export default class Painter {

    /**
     * @method moveTo 移动到指定点
     * @param {CanvasRenderingContext2D} ctx  绘制上下文
     * @param {Point} 目标点
     */
    static moveTo(ctx: CanvasRenderingContext2D, p: Point):void {
        ctx.moveTo(p.x - .5, p.y - .5);
    }

    /**
     * @method lineTo 画线到指定点
     * @param {CanvasRenderingContext2D} ctx  绘制上下文
     * @param {Point} 目标点
     */
    static lineTo(ctx: CanvasRenderingContext2D, p: Point):void {
        ctx.lineTo(p.x - .5, p.y - .5);
    }

    /**
     * @method moveTo 移动到指定点
     * @param {CanvasRenderingContext2D} ctx  绘制上下文
     * @param {Line} line 线条
     */
    static line(ctx: CanvasRenderingContext2D, line: Line):void {
        Painter.moveTo(ctx, line.start);
        Painter.lineTo(ctx, line.end);
    }

    /**
     * @method drawPolyLine 绘制折线
     * @param  {CanvasRenderingContext2D} ctx 绘制上下文
     * @param  {Point[]} points 数据点
     * @param  {number} lineWidth 折线线宽
     * @param  {string} color 折线颜色
     */
    static drawPolyLine(ctx: CanvasRenderingContext2D, points:Point[], lineWidth:number, color:string) {
      ctx.save()
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "square";
      Painter.moveTo(ctx, points[0]);
      points.map((p:Point) => Painter.lineTo(ctx, p))
      ctx.stroke();
      ctx.restore();
    }

  /**
   * @method fillPolyLine 绘制面积
   * @param  {CanvasRenderingContext2D} ctx 绘制上下文
   * @param  {Point[]} points 数据点
   */
  static fillPolyLine(ctx: CanvasRenderingContext2D, points: Point[],height:number) {
    ctx.save();
    ctx.beginPath();
    Painter.moveTo(ctx, {x:points[0].x,y:42+538});
    points.forEach((p: Point) => Painter.lineTo(ctx, p));
    Painter.lineTo(ctx, { x: points[points.length - 2].x, y: height });
    const linear = ctx.createLinearGradient(0, 0, 0, 10);
    linear.addColorStop(0, "rgba(255,153,255,0.8)");
    linear.addColorStop(1, "rgba(0,153,255,0.05)");
    ctx.fillStyle = linear;
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

    /**
     * @method drawLineBar 绘制折线
     * @param  {CanvasRenderingContext2D} ctx 绘制上下文
     * @param  {Point[]} points 数据点
     * @param  {number} lineWidth 折线线宽
     * @param  {string} color 折线颜色
     */
    static drawLineBar(ctx: CanvasRenderingContext2D, points:Point[], lineWidth:number, color:string) {
      ctx.save()
      ctx.beginPath();
      ctx.lineWidth = lineWidth;


      ctx.restore();
    }
}
