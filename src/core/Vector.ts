import { Point } from '../types';
class Vector {
    /**
     * create
     * @param {number} x
     * @param {number} y
     * @return {Vector}
     */
    public create(p:Point) {
        return p;
    }

    /**
     * 复制向量数据
     */
    public copy(p:Point) {
        return {...p}
    }

    /**
     * add
     */
    public add(p1:Point,p2:Point) {
        return {
            x: p1.x+p2.x,
            y: p1.y+p2.y
        }
    }

    /**
     * len
     */
    public len(p: Point) {
       return Math.sqrt(p.x * p.x + p.y * p.y)
    }
}