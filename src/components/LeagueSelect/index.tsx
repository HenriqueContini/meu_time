import { useState, useEffect } from 'react'
import LeagueType from '../../interfaces/leagueType'
import api from '../../services/api'
import Select from '../Select'

interface LeagueApiType {
  response: {
    league: LeagueType
  }[]
}

interface LeagueSelectProps {
  country: string
  season: string
  setLeague: (newLeague: string) => void
}

export default function LeagueSelect({ country, season, setLeague }: LeagueSelectProps) {
  const [leagueName, setLeagueName] = useState<string>('')
  const [leagues, setLeagues] = useState<LeagueType[]>([])
  const [filteredLeagues, setFilteredLeagues] = useState<LeagueType[]>([])

  const loadData = async (): Promise<void> => {
    const data = await api<LeagueApiType>(`leagues?country=${country}&season=${season}`)
    data.response.map(item => setLeagues(prevLeagues => [...prevLeagues, item.league]))
  }

  const filterLeagues = (inputValue: string): void => {
    if (inputValue.length > 0) {
      setFilteredLeagues(leagues.filter(l => l.name.toUpperCase().includes(inputValue.toUpperCase())))
    } else {
      setFilteredLeagues([])
    }
  }

  useEffect(() => {
    /* loadData() */
  }, [])

  useEffect(() => {
    console.log('Ocorreu uma atualização')
    if (leagueName) {
      let newId = leagues.filter(l => l.name === leagueName)
      setLeague(newId[0].id.toString())
    } else {
      setLeague('')
    }
  }, [leagueName])

  return (
    <Select name='league'
      label='Selecione uma liga: '
      placeholder='Insira o nome de uma liga'
      selectedValue={leagueName}
      setSelectedValue={setLeagueName}
      filterFunction={filterLeagues}>

      <>
        {filteredLeagues.map((l) => (
          <li key={l.id} onClick={() => {
            setLeagueName(l.name)
          }}>
            <img src={l.logo} alt={l.name} />
            <p>{l.name}</p>
          </li>
        ))}
      </>

    </Select>
  )
}
