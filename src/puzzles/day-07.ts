import { FileUtils, DisplayUtils } from '../utils';
import { performance } from 'perf_hooks';

export function solvePuzzle7(): void {

    const t1: number = performance.now();
    let bagMap: Map<string, Map<string, number>> = new Map();
    let validBags: string[] = [];
    const BAG_TO_CHECK: string = 'shiny gold';

    FileUtils.getInput('day-07-input.txt').split('\n').forEach((l) => {
        let bag = l.substr(0, l.indexOf(' bags'));
        let data = l.substr(l.indexOf('contain') + 8).replace('.', '').replace(',', '').split(' ');
        bagMap.set(bag, new Map());

        for (let i = 0; i < data.length; i += 4) {
            if (!isNaN(+data[i])) {
                let innerBag = data.slice(i+1, i+3).join(' ');
                bagMap.get(bag)?.set(innerBag, +data[i]);
                if (innerBag === BAG_TO_CHECK)
                    validBags.push(bag);
            }
        }
    });

    const p1: number = solveP1();
    const p2: number = solveP2();
    const t2: number = performance.now();
    DisplayUtils.print(7, p1, p2, t2-t1);

    function solveP1(): number {
        let i = 0;
        do {
            bagMap.forEach((val, key) => {
                if (!validBags.includes(key)) {
                    for(let key2 of Array.from(val.keys())) {
                        if (key2 === validBags[i])
                            validBags.push(key);
                    }
                }
            });
            i++;
        } while (i < validBags.length);
        return validBags.length;
    }

    function solveP2(): number {
        let countMap: Map<string, number> = new Map;
        let bagsToEval: [string, number][] = new Array([BAG_TO_CHECK, 1]);

        do {
            let bag: [string, number] = bagsToEval.shift()!;
            bagMap.get(bag[0])?.forEach((val, key) => {
                let count = bag[1] * val;
                bagsToEval.push([key, count]);
                countMap.set(key, countMap.has(key) ? countMap.get(key)! + count : count);
            });
        } while (bagsToEval.length > 0);

        return Array.from(countMap.values()).reduce((a, b) => a + b);
    }

}