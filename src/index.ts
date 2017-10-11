///<reference path="../mock/stocklist_1d.d.ts" />

import { override } from 'core-decorators';
import { point } from './types';
import Grid from './grid';
import LayOut from './Layout';

// 参数配置
const padding: number = 4;
const width: number = 1300;
const height: number = 540;
const masterHeight: number = 350;
const gutter: number = 40;

// 像素密度
const dpr:number = window.devicePixelRatio;
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
 
canvas.style.width=`${width}px`;
canvas.style.height=`${height}px`;
canvas.style.border=`1px solid #999`;

canvas.width = width*dpr;
canvas.height= height*dpr;

// 基础配置
ctx.scale(dpr,dpr);
ctx.strokeStyle = '#ccc';
ctx.lineWidth = 1;

function lineTo(p:point){
    ctx.lineTo(p.x-.5,p.y-.5)
}

function moveTo(p:point){
    ctx.moveTo(p.x-.5,p.y-.5)
}

function line(start:point,end:point){
    ctx.moveTo(start.x - .5, start.y - .5);
    ctx.lineTo(end.x - .5, end.y - .5);
}

const x1 = {
    top: padding,
    right: width - padding,
    bottom: width - padding,
    left: padding,
}
const x2 = x1;
const x3 = x1;

const y1 = {
    top: masterHeight + padding,
    right: masterHeight + padding,
    bottom: padding,
    left: padding,
}

const y2 = {
    top: height - padding,
    right: height - padding,
    bottom: masterHeight + padding * 2 + gutter,
    left: masterHeight + padding * 2 + gutter,
}

const y3 = {
    top: masterHeight + padding * 2,
    right: masterHeight + padding * 2,
    bottom: masterHeight + padding + gutter,
    left: masterHeight + padding + gutter,
}

let s1 = new LayOut({x: x1.top, y:y1.top },{ x:x1.right, y: y1.right }, { x: x1.bottom,y: y1.bottom },{x: x1.left,y:y1.left });
let s2 = new LayOut({x: x2.top, y:y2.top },{ x:x2.right, y: y2.right }, { x: x2.bottom,y: y2.bottom },{x: x2.left,y:y2.left });
let s3 = new LayOut({x: x3.top, y:y3.top },{ x:x3.right, y: y3.right }, { x: x3.bottom,y: y3.bottom },{x: x3.left,y:y3.left });

console.log('s3:',s3);



const grid = new Grid(s1);
const grid2 =  new Grid(s2);
const grid3 =  new Grid(s3);

ctx.beginPath();
ctx.strokeStyle = '#3d4449';
ctx.lineWidth = 1;

[grid.gridV, grid.gridH, grid2.gridV, grid2.gridH].map(item => item.map(p => line(p[0], p[1])));


grid.gridH.pop();

grid.gridH.map(p=>{
    ctx.fillStyle = '#ff3d3b';
    ctx.textAlign = 'start';
    ctx.font="10px";
    ctx.fillText((grid.p0.y -p[0].y).toString(), 5, p[0].y - 5);
    ctx.textAlign = 'end';
    ctx.fillText((grid.p0.y - p[0].y).toString(), p[1].x - 5, p[1].y - 5);
})

ctx.stroke();
ctx.restore();
