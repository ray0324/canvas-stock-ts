import { override } from 'core-decorators';
import { Point } from './types';
import Grid from './Grid';
import LayOut from './Layout';
import * as Utils from './Utils';

// 像素密度
const dpr:number = window.devicePixelRatio;
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');


// 参数配置
const padding: number = 4;
const width: number = 1300;
const height: number = 540;
const masterHeight: number = 350;
const gutter: number = 40;

// 初始化
canvas.style.width=`${width}px`;
canvas.style.height=`${height}px`;
canvas.style.border=`1px solid #999`;

canvas.width = width*dpr;
canvas.height= height*dpr;

// 基础配置
ctx.scale(dpr,dpr);

const x1 = {
    top: padding,
    right: width - padding,
    bottom: width - padding,
    left: padding,
}
const y1 = {
    top: padding,
    right: padding,
    bottom: masterHeight + padding,
    left: masterHeight + padding,
}

const x2 = x1;
const x3 = x1;



const y2 = {
    top: masterHeight + padding * 2 + gutter,
    right: masterHeight + padding * 2 + gutter,
    bottom: height - padding,
    left: height - padding,
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

console.log('layout:',s1);

const grid1 = new Grid(s1, 120, 30 );
const grid2 = new Grid(s2, 120, 30);
const grid3 = new Grid(s3, 12, 3);

console.log('grid:',grid1);

ctx.save()

ctx.strokeStyle = '#3d4449';
ctx.lineWidth = 1;
ctx.beginPath();
grid1.gridX.map(line=>Utils.line(ctx,line))
grid1.gridY.map(line=>Utils.line(ctx,line))
grid2.gridX.map(line=>Utils.line(ctx,line))
grid2.gridY.map(line=>Utils.line(ctx,line))
grid3.gridX.map(line=>Utils.line(ctx,line))
grid3.gridY.map(line=>Utils.line(ctx,line))
ctx.stroke();
ctx.restore();
