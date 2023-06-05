import type { CommandInteraction } from "discord.js";
import type { Bot } from "../index.js";

import { Command } from "../command.js";

export class PingCommand extends Command {
    client: Bot;

    constructor(client: Bot) {
        super(client, {
            name: "ping",
            description: "Diz a latência do bot",
        });
    }

    callback(interaction: CommandInteraction) {
        return interaction.reply(`🏓 Pong! (${interaction.createdTimestamp - Date.now()}ms)`);
    }
}