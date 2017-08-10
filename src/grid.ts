import {point} from './types';

export default class Grid {
    // 边界点
    readonly p0:point;
    readonly p1:point;
    readonly p2:point;
    readonly p3:point;

    readonly dx = 120;
    readonly dy = -40;

    // 网格线
    public gridV:point[][] = [];
    public gridH:point[][] = [];

    // 构造
    constructor(s:point[]) {
        this.p0 = { ...s[0]};
        this.p1 = { ...s[1]};
        this.p2 = { ...s[2]};
        this.p3 = { ...s[3]};
        this.getVerticalGridPoints();
        this.getHorizontalPoints();
    }

    /**
     * 
     * @param p 起点
     * @param q 终点
     * @param ref 参考点
     * @param delta 偏移量
     * @param target 目标对象
     * @param key 坐标名
     */
    private getGridPoints(p:point,q:point,ref:point,delta:number,target:Array<Array<point>>,key:keyof point){
        while(key === 'x' ? p[key] <= ref[key] : p[key] > ref[key]) {
            target.push([{...p},{...q}]);
            q[key] = p[key] += delta;
        }
    }

    public getVerticalGridPoints(){
        this.getGridPoints({...this.p3},{...this.p0},this.p1,this.dx,this.gridV,'x');
    }

    public getHorizontalPoints(){
        this.getGridPoints({...this.p3},{...this.p2},this.p0,this.dy,this.gridH,'y');
    }
}