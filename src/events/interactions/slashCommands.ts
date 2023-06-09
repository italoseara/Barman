import { ChatInputCommandInteraction, Events } from "discord.js";
import { Bot } from "../../classes/bot";
import { reply } from "../../systems/reply";

export const name: string = Events.InteractionCreate;

export async function execute(
    interaction: ChatInputCommandInteraction,
    client: Bot
): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, guild, user } = interaction;
    if (!guild) return;

    const command: any = client.commands.get(commandName);
    if (!command) {
        await reply(interaction, client.emojiList.error, "That command doesn't exist.");
        client.commands.delete(commandName);
    }

    if (command.devOnly && !client.config.devs.includes(user.id)) {
        await reply(
            interaction,
            client.emojiList.error,
            "This command is only available to developers."
        );
        return;
    }

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await reply(
            interaction,
            client.emojiList.error,
            "There was an error executing that command."
        );
    }
}
