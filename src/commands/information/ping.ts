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
    const { emojiList, ws } = client;

    await alert(interaction, {
        description: `${emojiList.pong} **Pong!** Latência da API: ${ws.ping}ms\n`,
        footer: { text: "Latência da API é a latência entre o bot e o Discord." },
        type: AlertType.SUCCESS,
    });
}
