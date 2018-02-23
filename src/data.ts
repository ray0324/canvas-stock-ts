import * as stocklist_1d from '../mock/stocklist_1d.json';
import { Point, Line } from './types';

const root = <any>stocklist_1d;
// console.log(root)

let cur: number[] = [];
let avg: number[] = [];
let vol: any[] = [];
let last_close: number = 42;
const colors = {
  base: 'rgba(255,255,255,.5)',
  rise: '#fc2f4d',
  fall: '#39c77d'
}

root.chartlist.reduce((prev: any, next: any, index: number) => {
  cur.push(next.current);
  avg.push(next.avg_price);
  if (index === 0) {
    vol.push({
      vol: next.volume,
      color: next.current - last_close > 0 ? colors.rise : colors.fall
    });
  } else {
    vol.push({
      vol: next.volume,
      color: next.current - prev.current > 0 ? colors.rise : colors.fall
    });
  }

  return next;

}, {})

export { cur, avg, vol, last_close };