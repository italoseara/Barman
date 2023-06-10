import { ChatInputCommandInteraction, Events } from "discord.js";
import { Bot } from "../../classes/bot";
import { AlertType, alert } from "../../systems/alert";

export const name: string = Events.InteractionCreate;

export async function execute(
    interaction: ChatInputCommandInteraction,
    client: Bot
): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, guild, user } = interaction;
    const { emojiList, commands } = client;

    if (!guild) return;

    const command: any = commands.get(commandName);

    if (!command) {
        await alert(interaction, {
            title: `${emojiList.error} Error`,
            description: `The command \`${commandName}\` does not exist.`,
            type: AlertType.ERROR,
            ephemeral: true,
        });
        commands.delete(commandName);
    }

    if (command.devOnly && !client.config.devs.includes(user.id)) {
        await alert(interaction, {
            title: `${emojiList.error} Error`,
            description: "This command is only available to developers.",
            type: AlertType.ERROR,
            ephemeral: true,
        });
        return;
    }

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await alert(interaction, {
            title: `${emojiList.error} Error`,
            description: `An error occurred while executing the command \`${commandName}\``,
            type: AlertType.ERROR,
            ephemeral: true,
        });
    }
}
