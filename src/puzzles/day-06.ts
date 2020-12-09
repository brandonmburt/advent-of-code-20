import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle6(): void {

    const t1: number = performance.now();
    const OFFSET: number = 'a'.charCodeAt(0);
    let vals: number[] = [], groupVals: number[] = [];
    let input: Array<any> = FileUtils.getInput('day-06-input.txt').split('\r\n\r\n').map(x => x.split('\r\n'));

    input.forEach((s: Array<any>) => {
        let arr = new Array<number>(26).fill(0);
        s.forEach(v => {
            [...v.trim()].forEach(c => {
                arr[c.charCodeAt(0) - OFFSET]++;
            });
        })
        vals.push(arr.reduce((a, b) => a + +(b > 0), 0));
        groupVals.push(arr.reduce((a, b) => a + (b === s.length ? 1 : 0), 0));
    });

    const p1: number = vals.reduce((a, b) => a + b, 0);
    const p2: number = groupVals.reduce((a, b) => a + b, 0);
    const t2: number = performance.now();

    DisplayUtils.print(6, p1, p2, t2-t1);

}