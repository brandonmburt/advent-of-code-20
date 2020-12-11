import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

interface Seat {
    val: string;
    adj: number[][];
}

interface Instruction {
    x: number;
    y: number;
    newVal: string;
}

export function solvePuzzle11(): void {

    const t1: number = performance.now();
    const input: string[][] = FileUtils.getInput('day-11-input.txt').split('\r\n').map(x => x.split(''));
    const maxRow: number = input.length - 1;
    const maxCol: number = input[0].length - 1;

    let dataP1: Seat[][] = [], dataP2: Seat[][] = [];
    input.forEach((a, row) => {
        let rowDataP1: Seat[] = [], rowDataP2: Seat[] = [];
        a.forEach((b, col) => {
            let adjSeatsP1: number[][] = [];
            if (b !== '.') {
                for (let r = row-1; r <= row+1; r++) {
                    if (r >= 0 && r <= maxRow) {
                        for (let c = col-1; c <= col+1; c++) {
                            if (c >= 0 && c <= maxCol && !(c === col && r === row) && input[r][c] !== '.') {
                                adjSeatsP1.push([r, c]);
                            }
                        }
                    }
                }
            }
            let adjSeatsP2: number[][] = [];
            if (b !== '.') {
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (x !== 0 || y !== 0) {
                            let xCoord = row + x, yCoord = col + y;
                            while (xCoord >= 0 && xCoord <= maxRow && yCoord >= 0 && yCoord <= maxCol) {
                                if (input[xCoord][yCoord] !== '.') {
                                    adjSeatsP2.push([xCoord, yCoord]);
                                    break;
                                } else {
                                    xCoord += x;
                                    yCoord += y;
                                }
                            }
                        }
                    }
                }
            }
            rowDataP1.push({ val: b, adj: adjSeatsP1 });
            rowDataP2.push({ val: b, adj: adjSeatsP2 });
        });
        dataP1.push(rowDataP1);
        dataP2.push(rowDataP2);
    });

    const p1 = getFinalOccupiedSeats(dataP1, 4);
    const p2 = getFinalOccupiedSeats(dataP2, 5);
    const t2: number = performance.now();

    DisplayUtils.print(11, p1, p2, t2-t1);

    function getFinalOccupiedSeats(data: Seat[][], threshold: number): number {
        let instructions: Instruction[] = [];

        do {
            instructions.forEach(i => data[i.x][i.y].val = i.newVal);
            instructions = [];

            data.forEach((x, row) => {
                x.forEach((y, col) => {
                    if (y.val === 'L' && shouldBecomeOccupied(y.adj, data)) {
                        instructions.push({ x: row, y: col, newVal: '#'});
                    } else if (y.val === '#' && shouldBecomeEmpty(y.adj, data, threshold)) {
                        instructions.push({ x: row, y: col, newVal: 'L'});
                    }
                });
            });
        } while (instructions.length !== 0);

        return data.reduce((acc, row) => acc += row.reduce((a, v) => a += +(v.val==='#'), 0), 0);
    }

    function shouldBecomeOccupied(adjSeats: number[][], data: Seat[][]): boolean {
        for (let i = 0; i < adjSeats.length; i++) {
            let [r, c] = adjSeats[i];
            if (data[r][c].val === '#') {
                return false;
            }
        }
        return true;
    }

    function shouldBecomeEmpty(adjSeats: number[][], data: Seat[][], threshold: number): boolean {
        if (adjSeats.length < threshold) {
            return false;
        }
        let count = 0;
        for (let i = 0; i < adjSeats.length; i++) {
            let [r, c] = adjSeats[i];
            if (data[r][c].val === '#') {
                count++;
                if (count >= threshold) {
                    return true;
                }
            }
        }
        return false;
    }

}
