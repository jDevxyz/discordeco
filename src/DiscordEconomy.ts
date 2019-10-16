import { SQLAdapter } from './SQLAdapter'
import lodash from 'lodash'
import { EventEmitter } from 'events'

export class DiscordEconomy extends EventEmitter {
  private defaultBalance: number
  private name: string
  private db: SQLAdapter
  private path: string

  constructor(opt: DiscordEconomyOpt = { defaultBalance: undefined, path: undefined }) {
    super()
    if (opt.defaultBalance !== undefined) { this.defaultBalance = lodash.toNumber(opt.defaultBalance)
    } else { this.defaultBalance = 0 }

    if (opt.shared!!.enabled) { this.name = opt.shared!!.name
    } else { this.name = 'shared' }

    if (opt.path !== undefined) { this.path = opt.path
    } else { this.path = 'discordeco' }

    this.db = new SQLAdapter({
      path: this.path,
      dbopt: {},
      debugger: this,
      name: this.name,
    })
  }

  public fetchBalance(uuid: string): undefined | number {
    if (!uuid) { throw new TypeError("ONORE DIDN'T PUT THE UUID INSIDE THE fetchBalance() METHOD!!!") }
    if (isNaN(parseInt(uuid))) { throw new TypeError('ONORE UUID IS NOT A NUMBER!!!') }
    const balance: number = this.db.select(uuid)
    if (balance == null) { this.db.insert(uuid, this.defaultBalance) } else { return lodash.toNumber(balance) }
  }
  public addBalance() {

  }
  public updateBalance() {

  }
  public setBalance() {

  }
  public getDaily() {

  }

}

export interface DiscordEconomyOpt {
  defaultBalance?: number
  shared?: SharedOpt
  path?: string
}

export interface SharedOpt {
  enabled: boolean
  name: string
}
