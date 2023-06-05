import type { CommandInteraction } from "discord.js";
import type { Bot } from "../index.js";

import { Command, CommandOptionType } from "../command.js";

export class ScheduleCommand extends Command {
    client: Bot;

    constructor(client: Bot) {
        super(client, {
            name: "marcar",
            description: "Marca um horário e notifica os participantes",
            options: [
                {
                    name: "titulo",
                    description: "Título do evento",
                    type: CommandOptionType.STRING,
                    required: true,
                },
                {
                    name: "data",
                    description: "Data do evento",
                    type: CommandOptionType.STRING,
                    required: true,
                },
                {
                    name: "hora",
                    description: "Hora do evento",
                    type: CommandOptionType.STRING,
                    required: true,
                },
            ]
        });
    }

    callback(interaction: CommandInteraction, titulo: string, data: string, hora: string): void {
        interaction.reply(`Evento marcado: ${titulo} em ${data} às ${hora}`);
    }
}