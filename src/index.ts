const padding = 4;
const width = 1300;
const height = 540;
const masterHeight = 350;
const gutter = 40;

// 像素密度
const dpr:number = window.devicePixelRatio;
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.style.width=`${width}px`;
canvas.style.height=`${height}px`;
canvas.style.border=`1px solid #ccc`;

canvas.width = width*dpr;
canvas.height= height*dpr;

ctx.scale(dpr,dpr);
ctx.strokeStyle = '#eee';
ctx.lineWidth = 1;

function lineTo(p:point){
    ctx.lineTo(p.x-.5,p.y-.5)
}

function moveTo(p:point){
    ctx.moveTo(p.x-.5,p.y-.5)
}

// 定义点
type point = {
    x:number,
    y:number
};

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

let l1 = layout.S1;
let l2 = layout.S2;
let l3 = layout.S3;

ctx.beginPath();

ctx.strokeRect(l1[0].x-.5, l1[0].y-.5, l1[2].x-l1[0].x,l1[2].y-l1[0].y);
ctx.strokeRect(l2[0].x-.5, l2[0].y-.5, l2[2].x-l2[0].x,l2[2].y-l2[0].y);
ctx.strokeRect(l3[0].x-.5, l3[0].y-.5, l3[2].x-l3[0].x,l3[2].y-l3[0].y);




function gGrid(l1:point[]){

    let p0:point = Object.assign({}, l1[0]);
    let p1:point = Object.assign({}, l1[1]);
    let p2:point = Object.assign({}, l1[2]);
    let p3:point = Object.assign({}, l1[3]);

    // 画网格 平行x
    let xGrid = [];
    let yGrid = [];

    let dy = 40;
    let dx = 120;

    // let _p0 = Object.assign({},p0);
    // let _p1 = Object.assign({},p1);
    // let _p2 = Object.assign({},p2);
    // let _p3 = Object.assign({},p3);

    for(let p = Object.assign({},p3), q = Object.assign({},p2); p.y > p0.y;){
        yGrid.push([Object.assign({},p), Object.assign({},q)]);
        p.y -= dy;
        q.y -= dy;
        debugger;
    }

    for(let p = Object.assign({},p3),q = Object.assign({},p0); p.x < p1.x;){
        xGrid.push([Object.assign({},p), Object.assign({},q)]);
        p.x += dx;
        q.x += dx;
    }

    yGrid.map(p=>{
        moveTo(p[0]);
        lineTo(p[1]);
    })

    xGrid.map(p=>{
        moveTo(p[0]);
        lineTo(p[1]);
    })
}

gGrid(l1);
gGrid(l2);




// while(_p0.y < p3.y){
//     yGrid.push([Object.assign({},_p0), Object.assign({},_p1)]);
//     _p0.y += dy;
//     _p1.y += dy;
// }

// while(_p0.y < p3.y){
//     yGrid.push([Object.assign({},_p0), Object.assign({},_p1)]);
//     _p0.y += dy;
//     _p1.y += dy;
// }







ctx.stroke();
// console.log(layout);
