import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle2(): void {

    const t1: number = performance.now();
    const data: string[][] = FileUtils.getInput('day-02-input.txt').split('\n').map(x => x.split(' '));
    let p1: number = 0, p2: number = 0;
    data.forEach(d => {
        let [range, char, str] = d;
        let [min, max] = range.split('-');
        let count = str.match(new RegExp(char[0], 'gi'))?.length ?? 0;
        p1 += +(count >= +min && count <= +max);
        p2 += +((str[+min-1] === char[0]) !== (str[+max-1] === char[0]));
    }, 0);
    const t2: number = performance.now();

    DisplayUtils.print(2, p1, p2, t2-t1);

}