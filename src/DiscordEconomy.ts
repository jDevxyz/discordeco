export class DiscordEconomy {
  constructor(opt: DiscordEconomyOpt) {

  }
}

export interface DiscordEconomyOpt {
  defaultBalance: number
  shared: SharedOpt
}

export interface SharedOpt {
  enabled: boolean
  name: string
}
