import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle10(): void {

    const t1: number = performance.now();
    let input: number[] = FileUtils.getInput('day-10-input.txt').split('\n').map(Number).sort((a,b) => a-b);
    let instances: number[] = input.map(x => x <= 3 ? 1 : 0);
    const len = input.length;
    let j1 = 0, j3 = 0;

    input.forEach((n, i) => {
        const diff = n - (input[i-1] ?? 0);
        j1 += +(diff === 1);
        j3 += +(diff === 3);
    });

    for (let i = 0; i < len; i++) {
        for (let j = 1; j <= 3; j++) {
            if (j+i < len && input[j+i] - input[i] <= 3) {
                instances[j+i] += instances[i];
            }
        }
    }

    const p1 = j1 * (j3+1);
    const p2 = instances.pop();
    const t2: number = performance.now();

    DisplayUtils.print(10, p1, p2, t2-t1);

}
