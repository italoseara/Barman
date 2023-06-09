import { Client, ClientOptions, Collection } from "discord.js";

import * as config from "../../config.json";
import * as emojis from "../../emojis.json";

export class Bot extends Client {
    // Json files
    public config: { global: boolean; devGuildId: string; devs: string[] } = config;
    public emojiList: any = emojis;

    // Collections
    public commands: Collection<string, any> = new Collection();

    constructor(options: ClientOptions) {
        super(options);
    }

    public async start(token: string): Promise<void> {
        await this.login(token);
    }
}
