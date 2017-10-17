import { Point, Line } from './types';
import LayOut from './Layout';

export default class Scale {
    public xMin:number;
    public xMax:number;
    public yMin:number;
    public yMax:number;

    public deltaData:number;
    public dataMin:number;
    public openData:number;

    public deltaX:number;
    public deltaY:number;

    public scaleY:number;

    public y:number[];
    public avg:number[];

    constructor(layout:LayOut,data:any){
        this.xMin = layout.left.x;
        this.xMax = layout.bottom.x;
        this.yMin = layout.top.y;
        this.yMax = layout.left.y;
        this.deltaX = this.xMax - this.xMin;
        this.deltaY = this.yMax - this.yMin;
        this.getDataY(data);
    }

    public getDataY(data:any):any {
        const arr = data.map((item: any) => item.current);
        const dataMax = Math.max(...arr);
        const dataMin = Math.min(...arr);
        const deltaData = dataMax - dataMin;
        const scale = this.deltaY / deltaData;
        this.deltaData = deltaData;
        this.dataMin = dataMin;
        this.openData =arr[0];
        // 坐标
        this.y = data.map((item: any) => {
            return this.yMax - (item.current - dataMin) * scale
        });
        this.avg = data.map((item: any) => {
            return this.yMax - (item.avg_price - dataMin) * scale
        });
    }

}
