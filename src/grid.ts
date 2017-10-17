import { Point, Line } from './types';
import LayOut from './Layout';

type Label = { pos:Point,val:number };

// 定义线段类型
export default class Grid {
    public top: Point;
    public right: Point;
    public bottom: Point;
    public left: Point;

    private deltaX:number;
    private deltaY:number;

    private stepX: number; // x轴 步长
    private stepY: number; // y周 步长

    private offsetX: number; // x轴 起始线偏移距离
    private offsetY: number; // y轴 起始线偏移距离

    public gridH: Line[] = [];
    public gridV: Line[] = [];

    public labelY: Label[] = [];
    public labelY2: Label[] = [];
    public labelX: Label[] = [];

    public width: number;
    public height: number;

    // 构造
    constructor(layout: LayOut, stepX: number, stepY: number) {
        this.top = { ...layout.top };
        this.right = { ...layout.right };
        this.bottom = { ...layout.bottom };
        this.left = { ...layout.left };

        this.stepX = stepX;
        this.stepY = stepY;

        this.deltaX = this.right.x - this.top.x;
        this.deltaY = this.bottom.y -this.top.y;

        this.width = layout.width;
        this.height = layout.height;
        this.getGridLine();
    }

    private getGridLine() {
        for(let y = this.left.y,i = 0; y > this.top.y; y -= this.stepY,i++){
            let start: Point = { x: this.left.x, y }
            let end: Point ={ x: this.bottom.x, y }
            this.gridH.push({start,end});
            this.labelY.push({pos:start,val:this.stepY*i/this.deltaY})
            this.labelY2.push({pos:end,val:this.stepY*i/this.deltaY})
        }
        // 添加终点
        // this.gridX.push({ start:this.top, end:this.right })

        for(let x = this.left.x,i=0; x < this.bottom.x; x += this.stepX,i++){
            let start: Point = { x, y:this.left.y }
            let end: Point ={ x, y:this.top.y }
            this.gridV.push({start,end})
            this.labelX.push({pos:start,val:this.stepX*i/this.deltaX})
        }
        // this.gridY.push({ start: this.bottom, end: this.right })
    }
}
