const pr:number = window.devicePixelRatio;
const canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');

// 设置css 宽高
canvas.style.width=document.body.clientWidth+'px';
canvas.style.height=document.documentElement.clientHeight+'px';

console.log(document.body.clientWidth+'px',document.body.clientWidth * pr);
console.log(document.documentElement.clientHeight+'px',document.documentElement.clientHeight * pr);

// 设置canvas宽高
canvas.width=document.body.clientWidth * pr;
canvas.height=document.documentElement.clientHeight * pr;

// log
console.log(document.documentElement.clientHeight * pr);
console.log(document.documentElement.clientHeight);

const ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext('2d');
console.log(ctx);


type point = {
    x:number,
    y:number
};

let p1:point = {
    x:1,
    y:2
}

