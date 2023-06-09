import * as fs from "fs";

export function loadFiles(path: string): string[] {
    const files: string[] = [];
    const directories: string[] = [];

    const dir: string[] = fs.readdirSync(path);

    for (const file of dir) {
        const filePath: string = path + "/" + file;

        if (fs.statSync(filePath).isDirectory()) directories.push(filePath);
        else if (file.endsWith(".js")) files.push(filePath);
    }

    for (const directory of directories) {
        const dirFiles: string[] = loadFiles(directory);

        for (const file of dirFiles) files.push(file);
    }

    return files;
}
