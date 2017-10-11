
/**
 * 构造布局
 * 
 */
 
import { Point } from './types';

export default class LayOut {
    public top: Point;
    public right: Point;
    public bottom: Point;
    public left: Point;

    public width: number;
    public height: number;

    constructor(top:Point,right:Point,bottom:Point,left:Point) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.width = this.getWidth();
        this.height = this.getHeight();
    }

    /**
     * getWidth
     */
    private getWidth() {
        return this.right.x - this.top.x;
    }

    /**
     * getHeight
     */
    private getHeight() {
        return this.left.y - this.top.y;
    }
}