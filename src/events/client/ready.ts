import { Events } from "discord.js";
import { Bot } from "../../classes/bot";
import { loadCommands } from "../../functions/commandLoader";

export const name: string = Events.ClientReady;
export const once: boolean = true;

export async function execute(client: Bot): Promise<void> {
    loadCommands(client);

    console.log(`Logged in as ${client.user?.tag}!`);
}
