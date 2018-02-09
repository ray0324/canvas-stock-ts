import { Point, Line } from './types';

export class Scale {
  // 动态计算出原点和缩放比例
  static dynamiclyCalcOriginAndScale(data:number[],base:number,height:number) {
    const max = Math.max(...data,base);
    const min = Math.min(...data,base);
    const scale = height / (max - min) * 0.9;
    const origin = Math.round((max - base) / (max - min) * height);
    // const origin = Math.round(1/2 * height);
    return {origin,scale, base};
  }
}
 