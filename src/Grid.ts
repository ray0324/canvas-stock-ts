import { Point, Line } from './types';
import LayOut from './Layout';
import * as Utils from './Utils';
type Label = { pos:Point,val:number };

// 定义线段类型
export default class Grid {

  // 定义网格上下左右四个坐标点
  public top: Point;
  public right: Point;
  public bottom: Point;
  public left: Point;

  // 网格线的总宽度和总高度
  public width:number;
  public height:number;

  // x轴线的分布情况
  private xGutterGroup:Array<number>;
  // y轴格线数量
  private yGridGutterAmount:number;

  // x 轴单位长度（像素）
  // public xUnit:number;
  // y轴中格子线间距
  public yGridGutter:number;

  // 垂直于x轴、y轴的网格线集合
  public xGridLines:Array<Line> = [];
  public yGridLines:Array<Line> = [];

  public yGridCentreLine:Line;

  // 网格与x轴,y轴的焦点集合
  public xGridStartPoints: Point[] = [];
  public xGridEndPoints: Point[] = [];
  public yGridStartPoints: Point[] = [];
  public yGridEndPoints: Point[] = [];

  // 构造
  constructor(layout: LayOut,xGutterGroup:Array<number>,yGridGutter:number) {
    // 边界点
    this.top = { ...layout.top };
    this.right = { ...layout.right };
    this.bottom = { ...layout.bottom };
    this.left = { ...layout.left };

    this.width = layout.width;
    this.height = layout.height;

    // x轴线 网格格线分布情况
    this.xGutterGroup = xGutterGroup;
    // y轴相邻两条线的间距
    this.yGridGutter = yGridGutter;

    // x轴最小的单位
    // this.xUnit = this.getXUnit();
    // y轴轴线数量
    this.yGridGutterAmount = this.getYGridGutterAmount();
    // 获取垂直于x轴的网格线
    this.getXgridLine();
    // 获取垂直于y轴的网格线
    this.getYgridLine();
    this.yGridCentreLine = this.getYgridCentreLine();
  }

  // 获取x轴线 单位长度
  private getXUnit() {
    return this.width / this.xGutterGroup.reduce((a:number, b:number)=>a+b);
  }

  // 获取y轴网格中心线
  private getYgridCentreLine(){
    const start = {
      x:this.top.x,
      y:(this.top.y+this.bottom.y) / 2
    }
    const end = {
        x:this.right.x,
        y:(this.top.y+this.bottom.y) / 2
    }
    return { start, end };
  }

  // 计算垂直于y轴的格线条数
  private getYGridGutterAmount() {
    if(Math.round(this.height % (this.yGridGutter*2)) > 0){
      return Math.floor(this.height / this.yGridGutter / 2) * 2 + 2;
    }
    return this.height / this.yGridGutter;
  }


  // 计算垂直于x轴线的线段集合
  private getXgridLine() {

    let len = this.xGutterGroup.reduce((prev, cur)=>prev+cur);

    this.xGutterGroup.reduce((prev,cur) => {
      let start:Point = {
        x: (prev+cur)/len * this.width + this.left.x,
        y: this.bottom.y
      }
      let end:Point = {
        x: (prev+cur)/len * this.width + this.left.x,
        y: this.top.y
      }
      this.xGridLines.push({ start,end });
      this.xGridStartPoints.push(start);
      this.xGridEndPoints.push(end);
      return prev+cur;
    },0)
    // while(i<this.xGutterGroup.length) {
    //   x+=this.xGutterGroup[i]*this.xUnit;
    //   this.xGridLines.push({
    //     start: {x: Math.round(x),y: this.bottom.y},
    //     end: {x: Math.round(x),y: this.top.y}
    //   });
      // this.xGridStartPoints.push({x: Math.round(x),y: this.bottom.y});
      // this.xGridEndPoints.push({x: Math.round(x),y: this.top.y});
    //   i++;
    // }
  }

  //计算垂直于y轴的线段集合
  private getYgridLine() {
    let ry:number = (this.height - (this.yGridGutterAmount-2) * this.yGridGutter) / 2;
    let dy:number = 0;
    for(let i:number = 0;i<=this.yGridGutterAmount;i++) {
      if(i === 0){
        dy += 0;
      }else if(i===1 || i===this.yGridGutterAmount) {
        dy += ry;
      }else{
        dy += this.yGridGutter;
      }
      let start = {x:this.left.x, y:Math.round(this.left.y-dy)};
      let end = {x:this.bottom.x, y:Math.round(this.left.y-dy)};
      this.yGridLines.push( { start, end });
      this.yGridStartPoints.push(start);
      this.yGridEndPoints.push(end);
    }
  }

  //绘制线条
  public drawLine(ctx:CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    this.xGridLines.map(line=>Utils.line(ctx,line));
    this.yGridLines.map(line=>Utils.line(ctx,line));
    ctx.strokeStyle = 'rgba(255,255,255,.2)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  }
  // 绘制标尺
  public drawLabel(ctx:CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle='rgba(255,255,255,.5)';
    ctx.font='200 18px Consolas';
    ctx.textAlign='center';
    this.xGridStartPoints.map((point,index)=>{
      const time = ['09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00']
      ctx.fillText(time[index],point.x,point.y+15)
    })
    ctx.textAlign='right';
    this.yGridStartPoints.map((point,index)=>{
      if(index === 0 || index === this.yGridStartPoints.length-1) return;
      let label = this.yGridCentreLine.start.y-point.y;
      label > 0 ? ctx.fillStyle='#df3d3d': ctx.fillStyle='#18c346';
      ctx.fillText(label.toFixed(0),point.x-5,point.y)
    })
    ctx.textAlign='left';
    this.yGridEndPoints.map((point,index)=>{
      if(index === 0 || index === this.yGridEndPoints.length-1) return;
      let label = (this.yGridCentreLine.start.y-point.y)/300;
      label > 0 ? ctx.fillStyle='#df3d3d': ctx.fillStyle='#18c346';
      ctx.fillText(label.toFixed(2)+'%',point.x+5,point.y)
    })
    ctx.restore();
  }
}
