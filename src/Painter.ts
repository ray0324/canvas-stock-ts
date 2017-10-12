import { Point, Line } from './types';

interface Pen {
    moveTo(ctx: CanvasRenderingContext2D, p: Point):void,
    lineTo(ctx: CanvasRenderingContext2D, p: Point):void,
    line(ctx: CanvasRenderingContext2D, line: Line):void,
}

export class Painter implements Pen {

    /**
     * moveTo 移动到指定的点
     * @param ctx 
     * @param p 
     */
    public moveTo(ctx: CanvasRenderingContext2D, p: Point):void {
        ctx.moveTo(p.x - .5, p.y - .5);
    }

    /**
     * lineTo 绘制到指定的点
     * @param ctx
     * @param p 
     */
    public lineTo(ctx: CanvasRenderingContext2D, p: Point):void {
        ctx.lineTo(p.x - .5, p.y - .5);
    }

    /**
     * line 绘制指定的线条
     * @param ctx 
     * @param line 
     */
    public line(ctx: CanvasRenderingContext2D, line: Line):void {
        this.moveTo(ctx, line.start);
        this.lineTo(ctx, line.end);
    }
}
