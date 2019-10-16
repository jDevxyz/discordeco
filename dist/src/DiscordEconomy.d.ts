/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class DiscordEconomy extends EventEmitter {
    private defaultBalance;
    private name;
    private db;
    private path;
    constructor(opt?: DiscordEconomyOpt);
    fetchBalance(uuid: string): undefined | number;
    addBalance(): void;
    updateBalance(): void;
    setBalance(): void;
    getDaily(): void;
}
export interface DiscordEconomyOpt {
    defaultBalance?: number;
    shared?: SharedOpt;
    path?: string;
}
export interface SharedOpt {
    enabled: boolean;
    name: string;
}
//# sourceMappingURL=DiscordEconomy.d.ts.map