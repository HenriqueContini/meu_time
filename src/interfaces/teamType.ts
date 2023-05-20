export default interface TeamType {
  league: {
    name: string
    season: number
  }
  team: {
    id: number
    name: string
    logo: string
  }
  fixtures: {
    played: {
      total: number
    }
    wins: {
      total: number
    }
    draws: {
      total: number
    }
    loses: {
      total: number
    }
  }
  goals: { 
    for: {
      minute: {
        '0-15': {
          total: number
        }
        '16-30': {
          total: number
        }
        '31-45': {
          total: number
        }
        '46-60': {
          total: number
        }
        '61-75': {
          total: number
        }
        '76-90': {
          total: number
        }
        '91-105': {
          total: number
        }
        '106-120': {
          total: number
        }
      }
    }
  }
  lineups: {
    formation: string
    played: number
  }[]
}