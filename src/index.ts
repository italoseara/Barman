import { Bot } from "./classes/bot";
import { config } from "dotenv";
import { loadEvents } from "./functions/eventLoader";
import { GatewayIntentBits, Partials } from "discord.js";

config();

const client = new Bot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

loadEvents(client);

client.start(process.env.DISCORD_TOKEN);
