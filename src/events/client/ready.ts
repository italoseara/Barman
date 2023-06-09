import { Events } from "discord.js";
import { Bot } from "../../classes/bot";

export const name: string = Events.ClientReady;
export const once: boolean = true;

export async function execute(client: Bot): Promise<void> {
    console.log(`Logged in as ${client.user?.tag}!`);
}
