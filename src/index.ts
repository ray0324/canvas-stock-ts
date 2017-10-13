import { override } from 'core-decorators';
import { Point } from './types';
import Grid from './Grid';
import LayOut from './Layout';
import * as Utils from './Utils';
import * as stocklist_1d from '../mock/stocklist_1d.json';
import Scale from './Scale';


interface Stock {
    symbol: string;
}

interface Chartlist {
    volume: number;
    avg_price: number;
    current: number;
    time: string;
}

interface RootObject {
    stock: Stock;
    success: string;
    chartlist: Chartlist[];
}

const root = <any>stocklist_1d;
console.log(root.chartlist);

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
// ctx.scale(dpr,dpr);

const x1 = {
    top: padding*dpr,
    right: (width - padding)*dpr,
    bottom: (width - padding)*dpr,
    left: padding*dpr,
}
const y1 = {
    top: padding*dpr,
    right: padding*dpr,
    bottom: (masterHeight + padding)*dpr,
    left: (masterHeight + padding)*dpr,
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

let scale = new Scale(s1, root.chartlist);

let currentLine: Point[] = scale.y.map((item,index)=>{
    const dx = scale.deltaX / scale.y.length;
    return {
        x: index * dx + scale.xMin,
        y: item
    }
})

let avgPriceLine: Point[] = scale.avg.map((item,index)=>{
    const dx = scale.deltaX / scale.avg.length;
    return {
        x: index * dx + scale.xMin,
        y: item
    }
})

console.log(currentLine);
console.log('layout:',s1);
console.log(scale);

const grid1 = new Grid(s1, 120*dpr, 30*dpr );
const grid2 = new Grid(s2, 120*dpr, 30*dpr);
const grid3 = new Grid(s3, 12000*dpr, 3000*dpr);

console.log('grid:',grid1);

ctx.save()

ctx.strokeStyle = 'rgba(255,255,255,0.1)';
ctx.lineWidth = 0.5;
ctx.beginPath();
grid1.gridX.map(line=>Utils.line(ctx,line))
grid1.gridY.map(line=>Utils.line(ctx,line))

// grid2.gridX.map(line=>Utils.line(ctx,line))
// grid2.gridY.map(line=>Utils.line(ctx,line))
// grid3.gridX.map(line=>Utils.line(ctx,line))
// grid3.gridY.map(line=>Utils.line(ctx,line))
ctx.stroke();
ctx.restore();


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




ctx.beginPath();
ctx.strokeStyle = '#f90';
ctx.lineCap = "round";
ctx.lineWidth = 1;
console.log(avgPriceLine[0]);

Utils.moveTo(ctx, avgPriceLine[0]);
avgPriceLine.map(point => Utils.lineTo(ctx, point))
ctx.stroke();
ctx.restore();