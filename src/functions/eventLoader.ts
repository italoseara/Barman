import { Bot } from "../classes/bot";
import { loadFiles } from "./fileLoader";

export function loadEvents(client: Bot): void {
    let loaded: number = 0;
    let failed: number = 0;

    const files: string[] = loadFiles("./dist/src/events");
    const cwd: string = process.cwd().replace(/\\/g, "/") + "/";

    for (const file of files) {
        const event: { name: string; once: boolean; execute: any } = require(cwd + file);

        if (!event.name) {
            failed++;
            continue;
        }

        if (event.once) client.once(event.name, (...args: any[]) => event.execute(...args, client));
        else client.on(event.name, (...args: any[]) => event.execute(...args, client));

        loaded++;
    }

    console.log(`Loaded ${loaded} events. Failed to load ${failed} events.`);
}
