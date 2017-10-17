import { Point, Line } from './types';

export function lineTo(ctx: CanvasRenderingContext2D, p: Point) {
    ctx.lineTo(p.x - .5, p.y - .5);
}

export function moveTo(ctx: CanvasRenderingContext2D,p: Point) {
    ctx.moveTo(p.x - .5, p.y - .5);
}

export function line(ctx: CanvasRenderingContext2D,line:Line) {
    moveTo(ctx,line.start);
    lineTo(ctx,line.end);
}
