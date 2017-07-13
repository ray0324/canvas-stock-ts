export const padding = 2;
export const width = 1300;
export const height = 540;
export const masterHeight = 350;
export const gutter = 20;

// 点
class Point{
    constructor(x,y) {
        this.x = x-.5;
        this.y = y-.5;
    }
}

class Section {
    constructor(p1,p2,p3,p4){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
}

class LayOut{
    constructor(width,height,padding){
        this.s1 = new Section(
            new Point(padding,padding),
            new Point(width-padding,padding),
            new Point(width-padding,masterHeight+padding),
            new Point(padding,masterHeight+padding)
        )
        this.s2 = new Section(
            new Point(padding,masterHeight+padding*2+gutter),
            new Point(width-padding,masterHeight+padding*2+gutter),
            new Point(width-padding,height-padding),
            new Point(padding,height-padding)
        )
        this.s3 = new Section(
            new Point(padding,masterHeight+padding*2),
            new Point(width-padding,masterHeight+padding*2),
            new Point(width-padding,masterHeight+padding+gutter),
            new Point(padding,masterHeight+padding+gutter)
        )
    }
}

const canvas = document.querySelector('canvas');
const dpr = window.devicePixelRatio || 1;


canvas.style.width=`${width}px`;
canvas.style.height=`${height}px`;
canvas.style.border=`1px solid #ccc`;

canvas.width = width*dpr;
canvas.height= height*dpr;
const ctx =  canvas.getContext('2d');
ctx.scale(dpr,dpr);
ctx.strokeStyle = '#f60';
ctx.lineWidth = 0.3;


const layout = new LayOut(width,height,padding);
console.log(layout);
const s1=  layout.s1;
const s2=  layout.s2;
const s3=  layout.s3;

function lineTo(p){
    ctx.lineTo(p.x,p.y)
}
function moveTo(p){
    ctx.moveTo(p.x,p.y)
}

// moveTo(s1.p1);
// lineTo(s1.p2);
// lineTo(s1.p3);
// lineTo(s1.p4);
// lineTo(s1.p1);

ctx.beginPath();

ctx.strokeRect(s1.p1.x, s1.p1.y, s1.p3.x-s1.p1.x, s1.p3.y-s1.p1.y);

for(let _p1= Object.assign({},s1.p4),_p2= Object.assign({},s1.p3),i=0,dY=(s1.p4.y-s1.p1.y)/15;_p1.y>=s1.p1.y;_p1.y-=dY,_p2.y-=dY){
    moveTo(_p1);
    lineTo(_p2);
    ctx.textAlign="start";
    ctx.font="9px Arial";
    ctx.fillText(Math.floor(dY*i), _p1.x+3, _p1.y-2);
    i++;
}

for(let _p1= Object.assign({},s1.p1),_p4= Object.assign({},s1.p4),dX=50;_p1.x<=s1.p2.x;_p1.x+=dX,_p4.x+=dX){
    moveTo(_p1);
    lineTo(_p4);
}

ctx.strokeRect(s2.p1.x,s2.p1.y,s2.p3.x-s2.p1.x,s2.p3.y-s2.p1.y);

for(let _p1= Object.assign({},s2.p1),_p2= Object.assign({},s2.p2),dY=(s2.p4.y-s2.p1.y)/5;_p1.y<=s2.p4.y;_p1.y+=dY,_p2.y+=dY){
    moveTo(_p1);
    lineTo(_p2);
    ctx.textAlign="start";
    ctx.fillText(Math.floor(_p1.y), _p1.x+6, _p1.y+6);
}
for(let _p1= Object.assign({},s2.p1),_p4= Object.assign({},s2.p4),dX=50;_p1.x<=s2.p2.x;_p1.x+=dX,_p4.x+=dX){
    moveTo(_p1);
    lineTo(_p4);
}

ctx.strokeRect(s3.p1.x,s3.p1.y,s3.p3.x-s3.p1.x,s3.p3.y-s3.p1.y);

ctx.stroke();
ctx.save();




console.log(layout);