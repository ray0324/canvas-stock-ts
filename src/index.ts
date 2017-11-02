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
    top: padding*dpr+45,
    right: (width - padding)*dpr-45,
    bottom: (width - padding)*dpr-45,
    left: padding*dpr+45,
}

const y1 = {
    top: padding*dpr+20,
    right: padding*dpr+20,
    bottom: (masterHeight + padding)*dpr-20,
    left: (masterHeight + padding)*dpr-20,
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
//
let currentLine: Point[] = scale.y.map((item,index)=>{
    const dx = 5;
    return {
        x: Math.floor(index * dx + scale.xMin),
        y: Math.floor(item)
    }
})
//
let avgPriceLine: Point[] = scale.avg.map((item,index)=>{
    const dx = 5;
    return {
        x: Math.floor(index * dx + scale.xMin),
        y: Math.floor(item)
    }
})
let avg = [...avgPriceLine,...avgPriceLine]

//
// console.log(currentLine);
// console.log('layout:',s1);
// console.log(scale);

// const grid1 = new Grid(s1, 20*dpr ,new Date('2017-10-20 09:30'),new Date('2017-10-20 15:00'));
// const grid2 = new Grid(s2, 120*dpr, 20*dpr);

const grid1 = new Grid(s1, [0, 30, 30, 30,30,30,30,30,30],30*dpr);
const grid3 = new Grid(s1, [0, 30, 30, 30, 30, 30, 30, 30, 30],30*dpr);
const grid2 = new Grid(s2, [0, 30, 30, 30,30,30,30,30,30],25*dpr);
// const grid3 = new Grid(s3, [0, 240],30);

console.log('grid:',grid1);
grid1.drawLine(ctx);
grid2.drawLine(ctx);
grid1.drawLabel(ctx);


// grid1.drawYline(ctx);
// grid2.drawXline(ctx);
// grid2.drawYline(ctx);
// grid3.drawXline(ctx);
// grid3.drawYline(ctx);

// grid1.drawGrid(ctx);
// 绘制网格线--------------------------------------

// ctx.save()
//
// ctx.strokeStyle = 'rgba(255,255,255,0.1)';
// ctx.lineWidth = 0.5;
// ctx.beginPath();
// grid1.gridH.map(line=>Utils.line(ctx,line));
//
// grid1.gridV.map(line=>Utils.line(ctx,line))
//
// grid2.gridH.map(line=>Utils.line(ctx,line))
// grid2.gridV.map(line=>Utils.line(ctx,line))
//
// Utils.moveTo(ctx, s3.top)
// Utils.lineTo(ctx, s3.right)
// Utils.lineTo(ctx, s3.bottom)
// Utils.lineTo(ctx, s3.left)
//
// ctx.strokeRect(s3.top.x-0.5,s3.top.y-0.5,s3.width,s3.height)
// ctx.strokeRect(grid1.top.x-0.5,grid1.top.y-0.5,grid1.width,grid1.height)
//
// ctx.stroke();
// ctx.restore();
// 绘制网格线--------------------------------------




// ctx.save();
// ctx.fillStyle='red';
// ctx.font='200 18px Helvatical';
// ctx.textAlign='right';
// grid1.labelY.map(item=>{
//   ctx.fillText((scale.dataMin+item.val*scale.deltaData).toFixed(2),item.pos.x-5,item.pos.y-5);
//
// });
// ctx.textAlign='right';
// grid1.labelY2.map(item=>{
//   ctx.fillText(((scale.dataMin+item.val*scale.deltaData-scale.openData)/scale.openData*100).toFixed(2)+'%',item.pos.x-3,item.pos.y-5);
// })
// ctx.restore();
//
ctx.save()
ctx.beginPath();
ctx.strokeStyle = '#09f';
ctx.lineWidth = 2;
ctx.lineCap = "round";
console.log(currentLine[0]);
Utils.moveTo(ctx, currentLine[0]);
currentLine.map(point => Utils.lineTo(ctx, point))
ctx.stroke();
ctx.restore();
ctx.save();
//
//
//
//
ctx.beginPath();
ctx.strokeStyle = '#f90';
ctx.lineCap = "round";
ctx.lineWidth = 2;

console.log(avgPriceLine[0]);
Utils.moveTo(ctx, avgPriceLine[0]);
avgPriceLine.map(point => Utils.lineTo(ctx, point))
ctx.stroke();
ctx.restore();
//
// ctx.save();
// (<any>window).ctx=ctx;
// ctx.beginPath();
//
// ctx.setLineDash([26,6,6,6]);
// ctx.strokeStyle="#f09"
// ctx.moveTo(1300,0)
// ctx.lineTo(1300,1080);
// ctx.moveTo(0,540)
// ctx.lineTo(2600,540);
// ctx.stroke()
