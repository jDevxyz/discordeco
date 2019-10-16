import Database from 'better-sqlite3'
import { SQLQueryTemplate, SQLTableName } from './Enum'
import { EventEmitter } from 'events'

export class SQLAdapter {
  public db: Database
  public timestamp = new Date()

  constructor(opt: SQLAdapterOptions) {
    if (opt.name == null) { opt.name = 'shared' }
    const debug = (message: string) => {
      opt.debugger.emit('debug', message)
    }
    opt.dbopt.verbose = debug
    this.db = new Database(`${opt.path}/${this.timestamp}.${opt.name}.db`, opt.dbopt)
    this.db.prepare(SQLQueryTemplate).run()
  }

  public insert(uuid: string, money: number) {
    this.db.prepare(`INSERT INTO ${SQLTableName} (uuid, money) VALUES (?, ?)`).run(uuid, money)
  }

  public update(uuid: string, money: number) {
    this.db.prepare(`UPDATE ${SQLTableName} SET money=?, WHERE uuid=?`).run(money, uuid)
  }

  public delete(uuid: string) {
    this.db.prepare(`DELETE FROM ${SQLTableName} WHERE uuid=?`).run(uuid)
  }

  public select(uuid: string): number {
    return this.db.prepare('SELECT * FROM economy WHERE id=?').run(uuid) as unknown as number
  }
}

export interface SQLAdapterOptions {
  path: string
  dbopt: BetterSQLiteOptions
  debugger: EventEmitter
  name?: string
}

export interface BetterSQLiteOptions {
  memory?: boolean
  readonly?: boolean
  fileMustExist?: boolean
  timeout?: number
  verbose?: any
}
