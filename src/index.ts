import { override } from 'core-decorators';
import { Point } from './types';
import Grid from './Grid';
import LayOut from './Layout';
import * as Utils from './Utils';
import * as stocklist_1d from '../mock/stocklist_1d.json';
import Scale from './Scale';

const root = <any>stocklist_1d;

console.log(root)

// 像素密度
const dpr:number = window.devicePixelRatio;
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');


// 参数配置
const padding: number = 5;
const width: number = 1300;
const height: number = 540;
const masterHeight: number = 350;
const gutter: number = 30;

// 初始化
canvas.style.width=`${width}px`;
canvas.style.height=`${height}px`;
canvas.style.border=`1px solid #999`;

canvas.width = width*dpr;
canvas.height= height*dpr;

// 基础配置
// ctx.scale(dpr,dpr);

const x1 = {
    top: padding*dpr+60,
    right: (width - padding)*dpr-60,
    bottom: (width - padding)*dpr-60,
    left: padding*dpr+60,
}

const y1 = {
    top: padding*dpr+15,
    right: padding*dpr+15,
    bottom: (masterHeight + padding)*dpr-15,
    left: (masterHeight + padding)*dpr-15,
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

let s1 = new LayOut({x: x1.top, y:y1.top },{ x:x1.right, y: y1.right }, { x: x1.bottom,y: y1.bottom },{x: x1.left,y:y1.left });
let s2 = new LayOut({x: x2.top, y:y2.top },{ x:x2.right, y: y2.right }, { x: x2.bottom,y: y2.bottom },{x: x2.left,y:y2.left });
let s3 = new LayOut({x: x3.top, y:y3.top },{ x:x3.right, y: y3.right }, { x: x3.bottom,y: y3.bottom },{x: x3.left,y:y3.left });

const grid1 = new Grid(s1, [0, 30, 30, 30,30,30,30,30,30],20*dpr);

console.log(grid1)
grid1.drawGrid(ctx);


let scale1 = new Scale(grid1,root.chartlist);

grid1.drawLabel(ctx, scale1.yOffsetMax,scale1.open);


console.log(scale1);
let price = scale1.y;


let currentLine: Point[] = scale1.y.map((y,i)=>{
    return {
      x:Math.floor(grid1.x[i]),
      y:Math.floor(y)
    }
});
currentLine.pop();
console.log(currentLine);

let avgPriceLine: Point[] = scale1.y2.map((y,i)=>{
    return {
      x:Math.floor(grid1.x[i]),
      y:Math.floor(y)
    }
});
currentLine.pop();
console.log(avgPriceLine);

ctx.save()
ctx.beginPath();
ctx.strokeStyle = '#09f';
ctx.lineWidth = 1;
ctx.lineCap = "round";
console.log(currentLine[0]);
Utils.moveTo(ctx, currentLine[0]);
currentLine.map(point => Utils.lineTo(ctx, point))
ctx.stroke();
ctx.restore();
ctx.save();
//
ctx.beginPath();
ctx.strokeStyle = '#f90';
ctx.lineCap = "round";
ctx.lineWidth = 1;

console.log(avgPriceLine[0]);
Utils.moveTo(ctx, avgPriceLine[0]);
avgPriceLine.map(point => Utils.lineTo(ctx, point))
ctx.stroke();
ctx.restore();
