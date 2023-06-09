import { Client, ClientOptions } from "discord.js";

export class Bot extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }

    public async start(token: string): Promise<void> {
        await this.login(token);
    }
}
