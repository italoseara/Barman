import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";

export async function reply(
    interaction: CommandInteraction,
    emoji: string,
    description: string,
    type?: boolean
): Promise<void> {
    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor(Colors.Blurple)
                .setDescription(`\`${emoji}\` | ${description}`),
        ],
        ephemeral: type || false,
    });
}
