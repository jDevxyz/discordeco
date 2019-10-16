/// <reference types="node" />
import Database from 'better-sqlite3';
import { EventEmitter } from 'events';
export declare class SQLAdapter {
    db: Database;
    timestamp: Date;
    constructor(opt: SQLAdapterOptions);
    insert(uuid: string, money: number): void;
    update(uuid: string, money: number): void;
    delete(uuid: string): void;
    select(uuid: string): number;
}
export interface SQLAdapterOptions {
    path: string;
    dbopt: BetterSQLiteOptions;
    debugger: EventEmitter;
    name?: string;
}
export interface BetterSQLiteOptions {
    memory?: boolean;
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
    verbose?: any;
}
//# sourceMappingURL=SQLAdapter.d.ts.map