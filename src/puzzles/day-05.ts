import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle5(): void {

    const t1: number = performance.now();
    const ids: number[] = FileUtils.getInput('day-05-input.txt').split('\n').map((d: any) => {
        let row = 0, col = 0;
        [...d.trim()].slice(0,7).forEach((v, i) => {
            row += 2 ** (6 - i) * +(v === 'B');
        });
        [...d.trim()].slice(-3).forEach((v, i) => {
            col += 2 ** (2 - i) * +(v === 'R');
        })
        return ((8 * row) + col);
    });
    const p1: number = Math.max(...ids);
    const p2: number = getMySeat();
    const t2: number = performance.now();

    DisplayUtils.print(5, p1, p2, t2-t1);

    function getMySeat(): number {
        const s: Set<number> = new Set(ids);
        for (let v of ids) {
            if (!s.has(v+1) && s.has(v+2)) {
                return v+1;
            }
        };
        return 0;
    }

}