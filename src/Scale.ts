import { Point, Line } from './types';
import Grid from './Grid'

export default class Scale {
  // 开盘价
  public open:number;
  public height:number;
  public low:number;

  public yOffsetMax:number;
  public yHeightMax:number;
  public midY:number;

  public y:number[];
  public y2:number[];

  constructor(grid:Grid,data:any){
    // 开盘价
    this.open =  4.94;
    this.yOffsetMax = this.getYoffsetMax(data);
    this.yHeightMax = grid.height / 2;
    this.midY = grid.midleY;
    this.getY(data);
    this.getY2(data);
  }

  getYoffsetMax(data:any) {
    const arr = data.map((item: any) => Math.abs(item.current-this.open));
    return  Math.max(...arr) * 1.1;
  }

  getY(data:any) {
    const arr = data.map((item: any) => item.current-this.open);
    console.log(arr);
    this.y = arr.map((i:number) => this.midY - this.yHeightMax*i/this.yOffsetMax);
  }

  getY2(data:any) {
    const arr = data.map((item: any) => item.avg_price-this.open);
    console.log(arr);
    this.y2 = arr.map((i:number) => this.midY - this.yHeightMax*i/this.yOffsetMax);
  }


}
