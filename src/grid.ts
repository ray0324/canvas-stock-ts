import {point} from './types';

export default class Grid {
    // 边界点
    readonly p0:point;
    readonly p1:point;
    readonly p2:point;
    readonly p3:point;
    readonly width:number;
    readonly height:number;

    readonly dx = 120;
    readonly dy = -30;

    // 网格线
    public gridV:point[][] = [];
    public gridH:point[][] = [];

    // 构造
    constructor(s:point[]) {
        this.p0 = { ...s[0]};
        this.p1 = { ...s[1]};
        this.p2 = { ...s[2]};
        this.p3 = { ...s[3]};
        this.width =  this.p1.x - this.p0.x;
        this.height = this.p0.y - this.p3.y;
        this.getVerticalGridPoints();
        this.getHorizontalPoints();
    }

    /**
     * 
     * @param start 起点
     * @param end 终点
     * @param delta 偏移量
     * @param ref 参考点
     * @param target 目标对象
     * @param key 坐标名
     */
    private getGridPoints(start:point,end:point,ref:point,delta:number,target:Array<Array<point>>,key:keyof point){

        while (key === 'x' ? start[key] < ref[key] : start[key] > ref[key]) {
            target.push([{...start},{...end}]);
            end[key] = start[key] += delta;
        }
        end[key] = start[key] = ref[key];
        target.push([{ ...start }, { ...end }]);
    }

    private getVerticalGridPoints(){
        this.getGridPoints({...this.p0},{...this.p3},this.p2,this.dx,this.gridV,'x');
    }

    private getHorizontalPoints(){
        this.getGridPoints({...this.p0},{...this.p1},this.p3,this.dy,this.gridH,'y');
    }
}