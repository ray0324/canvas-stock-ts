import { Point, Line } from './types';
export default class Painter {

    /**
     * moveTo 移动到指定的点
     * @param {CanvasRenderingContext2D} ctx  绘制上下文
     * @param {Point} 目标点
     */
    static moveTo(ctx: CanvasRenderingContext2D, p: Point):void {
        ctx.moveTo(p.x - .5, p.y - .5);
    }

    /**
     * moveTo 移动到指定的点
     * @param {CanvasRenderingContext2D} ctx  绘制上下文
     * @param {Point} 目标点
     */
    static lineTo(ctx: CanvasRenderingContext2D, p: Point):void {
        ctx.lineTo(p.x - .5, p.y - .5);
    }

    /**
     * moveTo 移动到指定的点
     * @param {CanvasRenderingContext2D} ctx  绘制上下文
     * @param {Line} line 线条
     */
    static line(ctx: CanvasRenderingContext2D, line: Line):void {
        Painter.moveTo(ctx, line.start);
        Painter.lineTo(ctx, line.end);
    }
}
