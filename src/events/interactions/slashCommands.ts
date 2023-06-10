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
            title: `${emojiList.error} Erro`,
            description: `O comando \`${commandName}\` não existe.`,
            footer: { text: "Use /help para ver a lista de comandos." },
            type: AlertType.ERROR,
            ephemeral: true,
        });
        commands.delete(commandName);
    }

    if (command.devOnly && !client.config.devs.includes(user.id)) {
        await alert(interaction, {
            title: `${emojiList.error} Erro`,
            description: "Este comando é restrito aos desenvolvedores do bot.",
            footer: { text: "Use /help para ver a lista de comandos." },
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
            title: `${emojiList.error} Erro`,
            description: `Um erro ocorreu na execução do comando \`${commandName}\``,
            footer: { text: "Contate um desenvolvedor." },
            type: AlertType.ERROR,
            ephemeral: true,
        });
    }
}
