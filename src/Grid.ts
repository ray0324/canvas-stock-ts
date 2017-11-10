import { Point, Line } from './types';
import LayOut from './Layout';
import * as Utils from './Utils';
import Painter from './Painter'

import {dpr} from './config';

/**
 * 构建绘图网格类型
 */
export default class Grid {
  //顶点
  public top: Point;
  // 宽度
  public width:number;
  public height:number;

  // x轴线刻度数量
  public tick_amount:number;

  // 水平网格线
  public horizontalGrid:number[] = [];
  public verticalGrid:number[] = [];

  // x轴线的分布情况
  private xGutterGroup:Array<number>;

  // y轴中格子线间距
  public yGridGutter:number;

  // 坐标系原点
  public origin:Point;
  public colors:any;

  public scale:number;
  public base:number;

  // 所有网格的x轴坐标
  public x:number[] = [];

  // 构造
  constructor(param:any) {
    // 边界点
    this.top = param.top;

    this.width = param.width;
    this.height = param.height;
    this.colors = param.colors;

    // x轴线 网格格线分布情况
    this.xGutterGroup = param.ticks;
    // y轴相邻两条线的间距
    this.yGridGutter = param.gutter;

    // x轴刻度数量
    this.tick_amount = this.getTickAmount();

    // 原点
    this.origin = {
      x: this.top.x,
      y: param.scale.origin + this.top.y
    }
    this.scale = param.scale.scale;
    this.base = param.scale.base;
    // 获取所有数据点的x坐标
    this.getX();
    // 获取垂直于x轴的网格线
    this.getVerticalGrid();
    // 获取垂直于y轴的网格线
    this.getHorizontalGrid();
  }

  // 获取x轴上总刻度数(含原点)
  private getTickAmount() {
    return this.xGutterGroup.reduce((prev, cur)=>prev+cur);
  }

  // 计算垂直于x轴线的线段集合
  private getVerticalGrid() {
    this.xGutterGroup.reduce((prev,cur) => {
      let x = Math.round((prev + cur) / this.tick_amount * this.width + this.top.x);
      this.verticalGrid.push(x);
      return prev+cur;
    },0);
  }

  private getHorizontalGrid() {
    let dy = this.yGridGutter;
    if(dy<=0) {
      throw new Error('Param Error.');
    }
    let y0 = this.origin.y;
    let y1 = this.top.y;
    let y2 = this.top.y+this.height;
    let bdy = Math.max(Math.abs(y0-y1),Math.abs(y2-y0));


    this.horizontalGrid.push(this.origin.y);

    for(let dh =dy;dh<bdy;dh += dy) {
      y0+dh < y2 && this.horizontalGrid.push(y0+dh);
      y0-dh > y1 && this.horizontalGrid.push(y0-dh);
    }

    // y0 !== y1 && this.horizontalGrid.push(y1);
    // y0 !== y2 && this.horizontalGrid.push(y2);
  }

  private getX() {
    for(let i = 0; i<= this.tick_amount;i++){
      this.x.push(this.origin.x+ this.width*i/this.tick_amount)
    }
  }

  // 绘制网格线
  public drawGrid(ctx:CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();

    this.verticalGrid.map(x=>{
      Painter.moveTo(ctx,{ x,y:this.top.y + this.height });
      Painter.lineTo(ctx,{ x,y:this.top.y });
    })

    Painter.moveTo(ctx,{ x:this.top.x,y:this.top.y});
    Painter.lineTo(ctx,{ x:this.top.x+this.width,y:this.top.y });
    this.horizontalGrid.map(y=>{
      Painter.moveTo(ctx,{ x:this.top.x,y});
      Painter.lineTo(ctx,{ x:this.top.x+this.width,y});
    })

    Painter.moveTo(ctx,{ x:this.top.x,y:this.top.y+this.height});
    Painter.lineTo(ctx,{ x:this.top.x+this.width,y:this.top.y+this.height });

    ctx.strokeStyle = 'rgba(255,255,255,.2)';
    ctx.lineWidth = 0.5;

    ctx.stroke();
    ctx.restore();
  }

  // x轴线 绘制
  public drawBottomLabel(ctx:CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle='rgba(255,255,255,.5)';
    ctx.font=`200 ${10 * dpr}px Menlo`;
    ctx.textAlign='center';
    const time = ['09:30','10:00','10:30','11:00','11:30/13:00','13:30','14:00','14:30','15:00']
    this.verticalGrid.map((x,i)=>{
        ctx.fillText(time[i],x,this.top.y+this.height+15*dpr);
    });
    ctx.restore();
  }

  public drawLeftLabel(ctx:CanvasRenderingContext2D,digits:number,color?:boolean) {
    this.horizontalGrid.forEach((y,i)=>{
      let dy = this.origin.y - y;
      let label = dy / this.scale + this.base;
      let colors = this.colors;
      if(color){
        ctx.fillStyle=colors.base;
      }else if(dy>0) {
        ctx.fillStyle=colors.rise;
      }else if( dy<0){
        ctx.fillStyle=colors.fall;
      }else{
        ctx.fillStyle=colors.base;
      }
      ctx.textAlign='right';
      ctx.fillText(label.toFixed(digits),this.top.x - 5*dpr, y);
    })
  }

  public drawRigtLabel(ctx:CanvasRenderingContext2D,digits:number,color?:boolean) {
    ctx.fillStyle='rgba(255,255,255,.5)';
    ctx.font=`200 ${10 * dpr}px Menlo`;
    this.horizontalGrid.forEach((y,i)=>{

      let dy = this.origin.y - y;
      let label = dy / this.scale + this.base;
      let percent = `${(dy/this.scale / this.base * 100).toFixed(digits)}%`;
      let colors = this.colors;
      if(color){
        ctx.fillStyle=colors.base;
      }else if(dy>0) {
        ctx.fillStyle=colors.rise;
      }else if( dy<0){
        ctx.fillStyle=colors.fall;
      }else{
        ctx.fillStyle=colors.base;
      }
      ctx.textAlign='left';
      ctx.fillText(percent,this.top.x + this.width + 5*dpr, y);

    })
  }

}
