import type { Bot } from "./index.js";

import { CommandInteraction } from "discord.js";

export interface CommandOption {
    name: string;
    description: string;
    type: CommandOptionType;
    required?: boolean;
    choices?: Array<{ name: string; value: string | number; }>;
}

export enum CommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP,
    STRING,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE,
    MENTIONABLE,
    NUMBER,
}

export class Command {
    public client: Bot;
    public name: string;
    public description: string;
    public options: Array<CommandOption>;

    constructor(client: Bot, options: { name: string; description?: string; options?: Array<CommandOption>; }) {
        this.client = client;
        this.name = options.name;
        this.description = options.description || "No description provided.";
        this.options = options.options || [];
    }

    callback(interaction: CommandInteraction, ...args: Array<any>): void {
        throw new Error(`Command ${this.name} doesn't provide a callback.`);
    }

}
