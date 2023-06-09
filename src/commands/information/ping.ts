import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Bot } from "../../classes/bot";
import { reply } from "../../systems/reply";

export const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mostra a latência do bot.");

export async function execute(
    interaction: ChatInputCommandInteraction,
    client: Bot
): Promise<void> {
    const { emojiList } = client;
    const ping: number = interaction.createdTimestamp - Date.now();

    await reply(interaction, emojiList.timer, `Pong! Latência: ${ping}ms.`);
}
