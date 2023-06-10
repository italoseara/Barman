import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Bot } from "../../classes/bot";
import { AlertType, alert } from "../../systems/alert";

export const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mostra a latência do bot.");

export async function execute(
    interaction: ChatInputCommandInteraction,
    client: Bot
): Promise<void> {
    const { emojiList } = client;
    const ping: number = interaction.createdTimestamp - Date.now();

    await alert(interaction, {
        description: `${emojiList.pong} **Pong!** Latência: ${ping}ms\n`,
        type: AlertType.SUCCESS,
    });
}
