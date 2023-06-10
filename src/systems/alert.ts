import {
    Colors,
    CommandInteraction,
    EmbedAuthorOptions,
    EmbedBuilder,
    EmbedFooterOptions,
} from "discord.js";

export enum AlertType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
    NEUTRAL = "neutral",
}

const AlertColor = {
    [AlertType.SUCCESS]: Colors.Green,
    [AlertType.ERROR]: Colors.Red,
    [AlertType.INFO]: Colors.Blue,
    [AlertType.WARNING]: Colors.Yellow,
    [AlertType.NEUTRAL]: Colors.White,
};

interface AlertOptions {
    title?: string;
    description: string;
    footer?: EmbedFooterOptions;
    type?: AlertType;
    author?: "user" | "client" | EmbedAuthorOptions;
    ephemeral?: boolean;
}

export async function alert(interaction: CommandInteraction, options: AlertOptions): Promise<void> {
    const { title, description, footer, type, author, ephemeral } = options;

    const embed = new EmbedBuilder()
        .setColor(type ? AlertColor[type] : Colors.White)
        .setDescription(description);

    if (footer) embed.setFooter(footer);
    if (title) embed.setTitle(title);
    if (author)
        if (author === "user")
            embed.setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });
        else if (author === "client")
            embed.setAuthor({
                name: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL(),
            });
        else embed.setAuthor(author);

    await interaction.reply({ embeds: [embed], ephemeral: ephemeral });
}
