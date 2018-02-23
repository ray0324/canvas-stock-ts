import { override } from 'core-decorators';
import { Point, Line } from './types';
import Grid from './Grid';
import Painter from './core/Painter';
import { Scale } from './Scale';
import { dpr } from './config';
import windowToCanvas from './core/windowToCanvas';
import { cur, avg, vol, last_close } from './data';

// 像素密度
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');


// 参数配置
const padding: number = 5;
const width: number = 1300;
const height: number = 540;

const masterHeight: number = 350;

// 初始化
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
// canvas.style.border = `1px solid #999`;

canvas.width = width * dpr;
canvas.height = height * dpr;

const PADDING_LEFT: number = 40 * dpr;
const PADDING_TOP: number = 1 * dpr;


let scale1 = Scale.dynamiclyCalcOriginAndScale(cur, last_close, canvas.height - PADDING_TOP*2);

const grid1 = new Grid({
  scale: scale1,
  width: canvas.width - PADDING_LEFT * 2,
  height: canvas.height - PADDING_TOP * 2,
  gutter: 30 * dpr,
  ticks: [0, 30, 30, 30, 30, 30, 30, 30, 30],
  top: { x: PADDING_LEFT, y: PADDING_TOP }
});

console.log(grid1)

grid1.drawGrid(ctx);
grid1.drawRigtLabel(ctx, 2);
grid1.drawLeftLabel(ctx, 2);
grid1.drawBottomLabel(ctx);


let p1: Point[] = cur.map((price: number, index: number) => {
  return {
    x: Math.floor(grid1.x[index]),
    y: scale1.origin - (price - grid1.base) * scale1.scale + grid1.top.y
  }
})

let p2: Point[] = avg.map((price: number, index: number) => {
  return {
    x: Math.floor(grid1.x[index]),
    y: scale1.origin - (price - grid1.base) * scale1.scale + grid1.top.y
  }
})


Painter.drawPolyLine(ctx, p1, 1.5, '#09f');
Painter.fillPolyLine(ctx, p1, grid1.height);
Painter.drawPolyLine(ctx, p2, 1.5, '#f90');
