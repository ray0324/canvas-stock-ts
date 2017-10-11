import { Point } from './types';

export function lineTo(ctx: CanvasRenderingContext2D, p: Point) {
    ctx.lineTo(p.x - .5, p.y - .5);
}

export function moveTo(ctx: CanvasRenderingContext2D,p: Point) {
    ctx.moveTo(p.x - .5, p.y - .5);
}

export function line(ctx: CanvasRenderingContext2D,start: Point, end: Point) {
    ctx.moveTo(start.x - .5, start.y - .5);
    ctx.lineTo(end.x - .5, end.y - .5);
}