import type { Command, CommandOption } from "./command.js";

import { Client, IntentsBitField, REST, Routes } from "discord.js";
import { config } from "dotenv";
import { PingCommand } from "./commands/ping.js";
import { ScheduleCommand } from "./commands/schedule.js";

config();

export class Bot extends Client {
    public commands: Array<{ name: string; description: string; options: Array<CommandOption> }>;

    constructor(options: any) {
        super(options);
        this.commands = [];
    }

    public override async login(token: string): Promise<string> {
        await super.login(token);
        await this.registerCommands();
        return token;
    }

    public async register(command: Command): Promise<void> {
        this.commands.push({
            name: command.name,
            description: command.description,
            options: command.options,
        });

        this.on("interactionCreate", async (interaction) => {
            if (!interaction.isCommand()) return;

            if (interaction.commandName === command.name) {
                await command.callback(interaction, ...interaction.options.data.map(
                    (option: any) => option.value)
                );
            }
        });

        console.log(`✅ Successfully registered command /${command.name}.`);
    }

    public async registerCommands(): Promise<void> {
        const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN || "");

        try {
            await rest.put(Routes.applicationCommands(this.user.id), {
                body: this.commands,
            });

            console.log("✅ Successfully reloaded application (/) commands.");
        } catch (error) {
            console.error(`❌ Error while reloading application (/) commands: ${error}`);
        }
    }
}

const client = new Bot({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const commands = [
    PingCommand,
    ScheduleCommand,
];

for (const command of commands) {
    client.register(new command(client));
}

client.on("ready", (c: Bot) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
