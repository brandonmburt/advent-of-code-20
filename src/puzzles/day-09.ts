import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle9(): void {

    const t1: number = performance.now();
    const data: number[] = FileUtils.getInput('day-09-input.txt').split('\n').map(x => +x);
    let s: Set<number> = new Set(data.slice(0,25));
    const p1: number = findFirstFailure();
    const p2: number = calcEncryptionWeakness(p1);
    const t2: number = performance.now();

    DisplayUtils.print(9, p1, p2, t2-t1);

    function findFirstFailure(): number {
        for (let i = 25; i < data.length; i++) {
            let matchFound = false;
            for (let j = i-25; j < i+25; j++) {
                if (s.has(data[i]-data[j])) {
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                return data[i];
            } else {
                s.delete(data[i-25]);
                s.add(data[i]);
            }
        }
        return 0;
    }

    function calcEncryptionWeakness(sum: number): number {
        for (let i = 0; i < data.length; i++) {
            let rangeSum = data[i];
            let len = 0;
            for (let j = i+1; j < data.length; j++) {
                rangeSum += data[j];
                if (rangeSum >= sum) {
                    len = j - i;
                    break;
                }
            }
            if (rangeSum === sum) {
                let arr = data.slice(i, i+len);
                return Math.min(...arr) + Math.max(...arr);
            }
        }
        return 0;
    }

}