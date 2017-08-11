const padding = 4;
const width = 1300;
const height = 540;
const masterHeight = 350;
const gutter = 30;

import { override } from 'core-decorators';

import * as timeLine from '../mock/stocklist_1m_normal.json';

import Grid from './grid';
import { point } from './types';

console.log(timeLine);

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

// 构建一个布局区块
class LayOut {
    public S1:point[];
    public S2:point[];
    public S3:point[];
    constructor(){
        this.S1 = [{
                x: padding,
                y: padding
            },{
                x: width-padding,
                y: padding
            },{
                x: width-padding,
                y: masterHeight+padding
            },{
                x: padding,
                y: masterHeight+padding
            }
        ]
        this.S2 =  [{
                x: padding,
                y: masterHeight+padding*2+gutter
            },{
                x: width-padding,
                y: masterHeight+padding*2+gutter
            },{
                x: width-padding,
                y: height-padding
            },{
                x: padding,
                y: height-padding
            }
        ]
        this.S3 = [{
                x: padding,
                y: masterHeight+padding*2
            },{
                x: width-padding,
                y: masterHeight+padding*2
            },{
                x: width-padding,
                y: masterHeight+padding+gutter
            },{
                x: padding,
                y: masterHeight+padding+gutter
            }
        ]
    }
}


let layout = new LayOut();

let s1 = layout.S1;
let s2 = layout.S2;
let s3 = layout.S3;

// ctx.beginPath();
// ctx.strokeRect(s3[0].x-.5, s3[0].y-.5, s3[2].x-s3[0].x,s3[2].y-s3[0].y);
// ctx.restore();


// function gGrid(s:point[]){

//     let p0:point = Object.assign({}, s[0]);
//     let p1:point = Object.assign({}, s[1]);
//     let p2:point = Object.assign({}, s[2]);
//     let p3:point = Object.assign({}, s[3]);

//     // 画网格
//     let xGrid = [];
//     let yGrid = [];

//     let dy = 40;  // y轴偏移
//     let dx = 120; // x轴偏移

//     ctx.beginPath();

//     ctx.strokeRect(p0.x-.5, p0.y-.5, p2.x-p0.x,p2.y-p0.y);

//     for(let p = Object.assign({},p3), q = Object.assign({},p2); p.y > p0.y;){
//         yGrid.push([Object.assign({},p), Object.assign({},q)]);
//         q.y = p.y -= dy;
//     }

//     for(let p = Object.assign({},p3),q = Object.assign({},p0); p.x < p1.x;){
//         xGrid.push([Object.assign({},p), Object.assign({},q)]);
//         q.x = p.x += dx;
//     }

//     console.log(JSON.stringify(xGrid));
//     console.log(JSON.stringify(yGrid));

//     yGrid.map(p=>{
        // ctx.fillStyle = 'blue';
        // ctx.textAlign = 'start';
        // ctx.fillText(p[0].y.toString(),10,p[0].y-10);
        // ctx.textAlign = 'end';
        // ctx.fillText(p[0].y.toString(),p[1].x-10,p[1].y-10);
        // moveTo(p[0]);
        // lineTo(p[1]);
//     })

//     xGrid.map(p=>{
//         moveTo(p[0]);
//         lineTo(p[1]);
//     })

//     ctx.stroke();
//     ctx.restore();

// }

// gGrid(s1);
// gGrid(s2);

const grid =  new Grid(s1);
const grid2 =  new Grid(s2);

console.log(JSON.stringify(grid.gridV));
console.log(JSON.stringify(grid.gridH));
console.log(grid);

ctx.beginPath();
ctx.strokeStyle = '#ccc';
ctx.lineWidth = 1;

[grid.gridV, grid.gridH].map((g,index)=>{
    g.map((p) => {
        if(index === 1){
            ctx.fillStyle = 'blue';
            ctx.textAlign = 'start';
            ctx.fillText(p[0].y.toString(), 10, p[0].y - 10);
            ctx.textAlign = 'end';
            ctx.fillText(p[0].y.toString(), p[1].x - 10, p[1].y - 10);
        }
        if(index === 0){
            ctx.fillStyle = 'blue';
            ctx.textAlign = 'end';
            ctx.fillText(p[0].x.toString(), p[1].x+10, p[0].y - 10);
        }
        moveTo(p[0]);
        lineTo(p[1]);
    });
});

ctx.stroke();
ctx.restore();