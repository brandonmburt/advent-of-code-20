import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle1(): void {

    const t1: number = performance.now();
    let input: number[] = FileUtils.getInput('day-01-input.txt').split('\n').map(i => +i).sort((a, b) => a - b);
    let numSet: Set<number> = new Set(input);
    const SUM: number = 2020;
    const len: number = input.length;
    const p1: number = problem1();
    const p2: number = problem2();
    const t2: number = performance.now();

    DisplayUtils.print(1, p1, p2, t2-t1);

    function problem1(): number {
        for (let v of input) {
            if (numSet.has(SUM-v))
                return v * (SUM - v);
        };
        return 0;
    }

    function problem2(): number {
        for (let i = 0; i < len; i ++) {
            for (let j = i+1; j < len; j++) {
                if (input[i] + input[j] >= SUM) {
                    break;
                } else if (numSet.has(SUM - input[i] - input[j])) {
                    return input[i] * input[j] * (SUM - input[i] - input[j]);
                }
            }
        }
        return 0;
    }

}
