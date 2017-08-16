



import { override } from 'core-decorators';
import { point } from './types';
import Grid from './grid';




import root from '../mock/stocklist_1d.json';
console.log(root);


// 参数配置
const padding = 4;
const width = 1300;
const height = 540;
const masterHeight = 350;
const gutter = 30;

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


// 构建一个布局区块
class LayOut {
    public S1:point[];
    public S2:point[];
    public S3:point[];
    constructor(){
        this.S1 = [{
                x: padding,
                y: masterHeight + padding
            },{
                x: width-padding,
                y: masterHeight+padding
            }, {
                x: width - padding,
                y: padding
            },{
                x: padding,
                y: padding
            }
        ]
        this.S2 = [{
                x: padding,
                y: height - padding
            }, {
                x: width - padding,
                y: height - padding
            },{
                x: width - padding,
                y: masterHeight + padding * 2 + gutter
            },{
                x: padding,
                y: masterHeight + padding * 2 + gutter
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

const grid = new Grid(s1);

const grid2 =  new Grid(s2);

// console.log(JSON.stringify(grid.gridV));
// console.log(JSON.stringify(grid.gridH));
// console.log(grid);



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
