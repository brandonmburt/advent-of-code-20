import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle3(): void {

    const t1: number = performance.now();
    const slopes: number[][] = [[1,1], [3,1], [5,1], [7,1], [1,2]];
    let data: string[] = FileUtils.getInput('day-03-input.txt').split('\n');
    const width: number = data[0].length;

    const treeCounts: number[] = slopes.map(slope => {
        let [r,d] = slope;
        let trees = 0, row = 1;
        for (let i = d; i < data.length; i += d) {
            const index = (row*r) % (width-1);
            if (data[i][index] === '#') {
                trees++;
            }
            row++;
        }
        return trees;
    });

    const p1: number = treeCounts[1];
    const p2: number = treeCounts.reduce((a,b) => a*b);
    const t2: number = performance.now();

    DisplayUtils.print(3, p1, p2, t2-t1);

}