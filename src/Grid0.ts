import { Point, Line } from './types';
import LayOut from './Layout';
import * as Utils from './Utils';
import Painter from './Painter'
type Label = { pos:Point,val:number };

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
  // y轴格线数量
  private yGridGutterAmount:number;
  // y轴中格子线间距
  public yGridGutter:number;

  // 所有网格的x轴坐标
  public x:number[] = [];

  // 构造
  constructor(layout: LayOut,xGutterGroup:Array<number>,yGridGutter:number) {
    // 边界点
    this.top = { ...layout.top };

    this.width = layout.width;
    this.height = layout.height;

    // x轴线 网格格线分布情况
    this.xGutterGroup = xGutterGroup;
    // y轴相邻两条线的间距
    this.yGridGutter = yGridGutter;
    // x轴刻度数量
    this.tick_amount = this.getTickAmount();
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

  //计算垂直于y轴的线段集合
  private getHorizontalGrid() {
    let height = this.height;
    let ry:number = (this.height % (this.yGridGutter * 2)) / 2;
    let dy:number = this.yGridGutter;
    // 起点
    this.horizontalGrid.push(this.top.y + height);

    if(ry !== 0) {
      height = height- ry;
      this.horizontalGrid.push(this.top.y + height);
    }

    while(height > dy) {
      height = height-dy;
      this.horizontalGrid.push(this.top.y + height);
    }

    // 终点
    this.horizontalGrid.push(this.top.y);

  }

  private getX() {
    for(let i = 0; i<= this.tick_amount;i++){
      this.x.push(this.top.x+ this.width*i/this.tick_amount)
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


    this.horizontalGrid.map(y=>{
      Painter.moveTo(ctx,{ x:this.top.x,y});
      Painter.lineTo(ctx,{ x:this.top.x+this.width,y});
    })

    ctx.strokeStyle = 'rgba(255,255,255,.2)';
    ctx.lineWidth = 0.5;

    ctx.stroke();
    ctx.restore();
  }

  // 绘制标尺
  public drawLabel(ctx:CanvasRenderingContext2D) {
    ctx.save();

    // 绘制x轴坐标位置
    ctx.fillStyle='rgba(255,255,255,.5)';
    ctx.font='200 12px Consolas';
    ctx.textAlign='center';
    const time = ['09:30','10:00','10:30','11:00','11:30/13:00','13:30','14:00','14:30','15:00']
    this.verticalGrid.map((x,i)=>{
        ctx.fillText(time[i],x,this.top.y+this.height+15);
    })

    // 绘制y轴
    ctx.textAlign='right';
    let center = this.top.y+this.height / 2 ;
    this.horizontalGrid.forEach((y,i)=>{
      ctx.textAlign='right';
      if(y < center) {
        ctx.fillStyle='#df3d3d'
      }else if( y > center){
        ctx.fillStyle='#18c346';
      }else{
        ctx.fillStyle='rgba(255,255,255,.5)';
      }
      ctx.fillText((center - y).toFixed(0),this.top.x - 5, y);
      ctx.textAlign='left';
      ctx.fillText((center -y).toFixed(0),this.top.x + this.width + 5, y);
    })

    ctx.restore();
  }
}
