// Type definitions for better-sqlite3 3.1
// Project: http://github.com/JoshuaWise/better-sqlite3
// Definitions by: Ben Davies <https://github.com/Morfent>
//                 Mathew Rumsey <https://github.com/matrumz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import Integer = require('integer')

export interface RunResult {
  changes: number
  lastInsertROWID: Integer.IntLike
}

// tslint-disable-next-line
export declare class Statement {
  public database: Database
  public source: string
  public returnsData: boolean
  constructor(db: Database, sources: string[]);

  public run(...params: any[]): RunResult
  public get(...params: any[]): any
  public all(...params: any[]): any[]
  public each(params: any, cb: (row: any) => void): void
  public each(cb: (row: any) => void): void
  public each(...params: any[]): void
  public pluck(toggleState ?: boolean): this
  public bind(...params: any[]): this
  public safeIntegers(toggleState ?: boolean): this
}

// tslint-disable-next-line
export declare class Transaction {
  public database: Database
  public source: string
  constructor(db: Database, sources: string[]);

  public run(...params: any[]): RunResult
  public bind(...params: any[]): this
  public safeIntegers(toggleState ?: boolean): this
}

export interface DatabaseOptions {
  memory ?: boolean
  readonly ?: boolean
  fileMustExist ?: boolean
}

export interface RegistrationOptions {
  name ?: string
  varargs ?: boolean
  deterministic ?: boolean
  safeIntegers ?: boolean
}

export interface Database {
  memory: boolean
  readonly: boolean
  name: string
  open: boolean
  inTransaction: boolean

  prepare(source: string): Statement
  transaction(sources: string[]): Transaction
  exec(source: string): this
  pragma(source: string, simplify ?: boolean): any
  checkpoint(databaseName ?: string): this
  register(cb: (...params: any[]) => any): this
  register(options: RegistrationOptions, cb: (...params: any[]) => any): this
  close(): this
  defaultSafeIntegers(toggleState ?: boolean): this
}

// tslint-disable-next-line
export declare class SqliteError implements Error {
  public name: string
  public message: string
  public code: string
  constructor(message: string, code: string);
}

export interface DatabaseConstructor {
  (filename: string, options ?: DatabaseOptions): Database
  prototype: Database

  Integer: typeof Integer
  SqliteError: typeof SqliteError
  new(filename: string, options ?: DatabaseOptions): Database
}

export declare const Database: DatabaseConstructor
export default Database
// kampang :uu
