import Database from 'better-sqlite3'
import { SQLQueryTemplate } from './Enum'
import { EventEmitter } from 'events'

export class SQLAdapter extends EventEmitter {
  public db: Database
  public timestamp = new Date()

  constructor(opt: SQLAdapterOptions) {
    super()
    if (opt.name == null) { opt.name = 'shared' }
    const debug = (message: string) => {
      this.emit('debug', message)
    }
    opt.dbopt.verbose = debug
    this.db = new Database(`${opt.path}/${this.timestamp}.${opt.name}.db`, opt.dbopt)
    this.db.prepare(SQLQueryTemplate).run()

  }

  public insert(uuid: string, money: number) {
    this.db.prepare('INSERT INTO economy (uuid, money) VALUES (?, ?)').run(uuid, money)
  }

  public update() {

  }

  public delete() {

  }

  public select(uuid: string) {
    this.db.prepare('SELECT * FROM economy WHERE id=?').run(uuid)
  }
}

export interface SQLAdapterOptions {
  path: string
  dbopt: BetterSQLiteOptions
  name?: string
}

export interface BetterSQLiteOptions {
  memory?: boolean
  readonly?: boolean
  fileMustExist?: boolean
  timeout?: number
  verbose?: any
}
