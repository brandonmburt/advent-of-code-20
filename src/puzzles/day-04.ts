import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle4(): void {

    const t1: number = performance.now();
    const input: string[][][] = FileUtils.getInput('day-04-input.txt').split('\r\n\r\n').map(x => {
        return x.split('\r\n').join(' ').split(' ').map(x => x.split(':'));
    });
    const data = input.filter(x => x.length >= 7);
    const s: Set<string> = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
    const eclSet = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
    const hclSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']);

    const p1: number = data.reduce((acc, d) => {
        return d.reduce((a, e) => s.has(e[0]) ? a+1: a , 0) >= 7 ? acc+1 : acc;
    }, 0);
    const p2: number = data.reduce((acc, d) => {
        return d.reduce((a, e) => s.has(e[0]) && meetsCriteria(e) ? a+1: a , 0) >= 7 ? acc+1 : acc;
    }, 0);

    const t2: number = performance.now();
    DisplayUtils.print(4, p1, p2, t2-t1);

    function meetsCriteria([k, v]: string[]): boolean {
        switch (k) {
            case 'ecl':
                return eclSet.has(v);
            case 'pid':
                return v.length === 9 && !isNaN(+v);
            case 'eyr':
                return !isNaN(+v) && v.length === 4 && +v >= 2020 && +v <= 2030;
            case 'hcl':
                if (v.length === 7 && v[0] === '#') {
                    for (let i = 1; i < v.length; i++) {
                        if (!hclSet.has(v[i])) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            case 'byr':
                return !isNaN(+v) && v.length === 4 && +v >= 1920 && +v <= 2002;
            case 'iyr':
                return !isNaN(+v) && +v.length === 4 && +v >= 2010 && +v <= 2020;
            case 'hgt':
                    let UOM: string = v.substr(v.length-2);
                    let val: number = isNaN(+v.substr(0, v.length-2)) ? 0 : +v.substr(0, v.length-2);
                    return (UOM === 'cm' && val >= 150 && val <= 193) || (UOM === 'in' && val >= 59 && val <= 76);
            default:
                return false;
        }
    }

}