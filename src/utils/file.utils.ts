import * as fs from 'fs';

export class FileUtils {

    public static getInput(puzzleInput: string): string {
        return fs.readFileSync("./src/puzzle-input/" + puzzleInput).toString();
    }

}