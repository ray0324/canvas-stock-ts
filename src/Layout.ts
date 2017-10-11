
/**
 * 构造布局
 * 
 */
 
import { point } from './types';

export default class LayOut {
    public top: point;
    public right: point;
    public bottom: point;
    public left: point;

    public width: number;
    public height: number;

    constructor(top:point,right:point,bottom:point,left:point) {
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