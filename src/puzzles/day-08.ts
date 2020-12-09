import { FileUtils, DisplayUtils } from '../utils';
import cloneDeep from 'lodash/cloneDeep';
import { performance } from 'perf_hooks';

export function solvePuzzle8(): void {

    const t1: number = performance.now();
    const d: Array<[string, number, boolean]> = [];
    FileUtils.getInput('day-08-input.txt').split('\n').forEach((v) => {
        d.push([v.substr(0, v.indexOf(' ')), +v.substr(v.indexOf(' ')+1), false]);
    });
    const len: number = d.length;
    const p1: number = calcAcc(cloneDeep(d))[0];
    let p2: number = 0;

    for (let i = 0; i < len; i++) {
        if (['jmp', 'nop'].some(x => x === d[i][0])) {
            let arr = cloneDeep(d);
            arr[i][0] = arr[i][0] === 'jmp' ? 'nop' : 'jmp';
            let res = calcAcc(arr);
            if (res[1] === len) {
                p2 = res[0];
                break;
            }
        }
    }

    const t2: number = performance.now();
    DisplayUtils.print(8, p1, p2, t2-t1);

    function calcAcc(arr: Array<any>): [number, number] {
        let i = 0, acc = 0;
        do {
            arr[i][2] = true;
            acc += arr[i][0] === 'acc' ? arr[i][1] : 0;
            i += arr[i][0] === 'jmp' ? arr[i][1] : 1;
        } while(i < len && arr[i][2] === false);
        return [acc, i];
    }

}