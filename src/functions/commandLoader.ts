import { loadFiles } from "./fileLoader";
import { Bot } from "../classes/bot";

export function loadCommands(client: Bot): void {
    const { commands, config, application, guilds } = client;

    // Clear the previous commands
    commands.clear();
    application.commands.set([]);

    let loaded: number = 0;
    let failed: number = 0;
    let commandsArray: any[] = [];

    const files: string[] = loadFiles("./dist/src/commands");
    const cwd: string = process.cwd().replace(/\\/g, "/") + "/";

    for (const file of files) {
        const command: { data: any; execute: any } = require(cwd + file);

        if (!command.data.name) {
            failed++;
            continue;
        }

        if (commandsArray.includes(command.data.name)) {
            failed++;
            continue;
        }

        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());

        loaded++;
    }

    console.log(`Loaded ${loaded} commands. Failed to load ${failed} commands.`);

    if (config.global) {
        application.commands.set(commandsArray);
    } else {
        const guild: any = guilds.cache.get(config.devGuildId);
        if (!guild) return;

        guild.commands.set(commandsArray);
    }
}
