import { override } from 'core-decorators';
import { Point,Line } from './types';
import Grid from './Grid';
import Painter from './core/Painter';
import * as stocklist_1d from '../mock/stocklist_1d.json';
import { Scale } from './Scale';
import {dpr} from './config';
import windowToCanvas from './core/windowToCanvas';

const root = <any>stocklist_1d;
console.log(root)

// 像素密度
// const dpr:number = window.devicePixelRatio;
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');


// 参数配置
const padding: number = 5;
const width: number = 1300;
const height: number = 540;
const masterHeight: number = 350;
const gutter: number = 2;

// 初始化
canvas.style.width=`${width}px`;
canvas.style.height=`${height}px`;
canvas.style.border=`1px solid #999`;

canvas.width = width*dpr;
canvas.height= height*dpr;

// 基础配置
// ctx.scale(dpr,dpr);

const x1 = {
    top: padding*dpr+60*dpr,
    right: (width - padding)*dpr-60*dpr,
    bottom: (width - padding)*dpr-60*dpr,
    left: padding*dpr+60*dpr,
}

const y1 = {
    top: padding*dpr+15*dpr,
    right: padding*dpr+15*dpr,
    bottom: (masterHeight + padding)*dpr-15*dpr,
    left: (masterHeight + padding)*dpr-15*dpr,
}

const x2 = x1;
const x3 = x1;

const y2 = {
    top: (masterHeight + padding * 2 + gutter)*dpr,
    right: (masterHeight + padding * 2 + gutter)*dpr,
    bottom: (height - padding)*dpr,
    left: (height - padding)*dpr,
}

const y3 = {
    top: (masterHeight + padding * 2)*dpr,
    right: (masterHeight + padding * 2)*dpr,
    bottom: (masterHeight + padding + gutter)*dpr,
    left: (masterHeight + padding + gutter)*dpr,
}

const colors = {
  base: 'rgba(255,255,255,.5)',
  rise: '#fc2f4d',
  fall: '#39c77d'
}

let cur:number[] = [];
let avg:number[] = [];
let vol:any[] = [];

// 昨日收盘价格
let last_close:number = 42.26;

root.chartlist.reduce((prev:any,next:any,index:number)=>{
  cur.push(next.current);
  avg.push(next.avg_price);
  if( index === 0 ){
    vol.push({
      vol: next.volume,
      color: next.current - last_close > 0 ? colors.rise : colors.fall
    });
  }else{
    vol.push({
      vol: next.volume,
      color: next.current - prev.current > 0 ? colors.rise : colors.fall
    });
  }

  return next;

},{})

console.log(vol)

let scale1 = Scale.dynamiclyCalcOriginAndScale(cur,last_close,320*dpr);
let scale2 = Scale.dynamiclyCalcOriginAndScale(vol.map(itm=>itm.vol),0,140*dpr);

const grid1 = new Grid({
  scale: scale1,
  width: 1170 * dpr,
  height: 320 * dpr,
  colors: colors,
  gutter: 20 * dpr,
  ticks: [0, 30, 30, 30, 30, 30, 30, 30, 30],
  top: { x:x1.top, y:y1.top }
})

const grid2 = new Grid({
  scale: scale2,
  width: 1170 * dpr,
  height: 140 * dpr,
  colors: colors,
  gutter: 20 * dpr,
  ticks: [0, 30, 30, 30, 30, 30, 30, 30, 30],
  top: { x:x1.top, y:y2.top }
})

grid1.drawGrid(ctx);
grid1.drawRigtLabel(ctx,2);
grid1.drawLeftLabel(ctx,2);
grid1.drawBottomLabel(ctx);

grid2.drawGrid(ctx);
grid2.drawLeftLabel(ctx,0,);


let p1:Point[] = cur.map((price:number,index:number)=>{
  return {
    x:Math.floor(grid1.x[index]),
    y: scale1.origin - (price - grid1.base) * scale1.scale + grid1.top.y
  }
})

let p2:Point[] = avg.map((price:number,index:number)=>{
  return {
    x:Math.floor(grid1.x[index]),
    y: scale1.origin - (price - grid1.base) * scale1.scale + grid1.top.y
  }
})

let p3:Point[] = vol.map((price:number,index:number)=>{
  return {
    x:Math.floor(grid2.x[index]),
    y: scale2.origin - (price - grid2.base) * scale2.scale + grid2.top.y
  };
})

let l3:any = vol.map((item:any,index:number)=>{
  let end = {
    x:Math.floor(grid2.x[index]),
    y: scale2.origin - (item.vol - grid2.base) * scale2.scale + grid2.top.y
  };
  let start = {
    x:Math.floor(grid2.x[index]),
    y:grid2.top.y+grid2.height
  }
  return {
    line:{start, end},
    color:item.color
  }
})

l3.pop();

console.log(l3)

Painter.drawPolyLine(ctx,p1,1.5,'#09f');
Painter.drawPolyLine(ctx,p2,1.5,'#f90');

drawBar(ctx, l3);

function drawBar(ctx:CanvasRenderingContext2D,items:any[]) {
  ctx.save()
  ctx.beginPath();
  ctx.lineWidth = 2.5 * dpr;

  items.map(item => {
    ctx.beginPath();
    ctx.strokeStyle = item.color;
    Painter.line(ctx, item.line);
    ctx.stroke();
  })

  ctx.restore();
}

canvas.addEventListener('click',function(e){
  console.log(e);
   let p:Point = windowToCanvas(canvas,e.pageX,e.pageY);
   ctx.save();
   ctx.setLineDash([24,6,6,6]);
   ctx.lineWidth = 2;
   ctx.strokeStyle='#069';
   Painter.moveTo(ctx, { x:0, y:p.y});
   Painter.lineTo(ctx, { x:canvas.width, y:p.y});
   Painter.moveTo(ctx, { x:p.x, y:0});
   Painter.lineTo(ctx, { x:p.x, y:canvas.height});
   ctx.stroke();
   ctx.restore();
   console.log(p)
})
