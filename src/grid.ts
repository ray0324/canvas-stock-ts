import { Point, Line } from './types';
import LayOut from './Layout';

// 定义线段类型
export default class Grid {
    private top: Point;
    private right: Point;
    private bottom: Point;
    private left: Point;

    private offsetX: number;
    private offsetY: number;

    public gridX: Line[] = [];
    public gridY: Line[] = [];

    // 构造
    constructor(s: LayOut, offsetX: number, offsetY: number) {
        this.top = { ...s.top };
        this.right = { ...s.right };
        this.bottom = { ...s.bottom };
        this.left = { ...s.left };
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.getGridLine();
    }

    private getGridLine() {
        for(let y = this.left.y; y > this.top.y; y -= this.offsetY){
            let start: Point = { x: this.left.x, y }
            let end: Point ={ x: this.bottom.x, y }
            this.gridX.push({start,end})
        }
        // 添加终点
        this.gridX.push({ start:this.top, end:this.right })

        for(let x = this.left.x; x < this.bottom.x; x += this.offsetX){
            let start: Point = { x, y:this.left.y }
            let end: Point ={ x, y:this.top.y }
            this.gridY.push({start,end})
        }
        this.gridY.push({ start: this.bottom, end: this.right })
    }
}