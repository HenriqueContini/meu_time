import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CountrySelect from '../../components/CountrySelect'
import SeasonSelect from '../../components/SeasonSelect'
import LeagueSelect from '../../components/LeagueSelect'
import api from '../../services/api'

interface TeamInfoType {
  id: number
  name: string
  logo: string
}

interface TeamApiType {
  response: {
    team: TeamInfoType
  }[]
}

export default function Home() {
  const navigate = useNavigate()
  const [country, setCountry] = useState<string>('Brazil')
  const [season, setSeason] = useState<string>('2022')
  const [league, setLeague] = useState<string>('')

  const [teams, setTeams] = useState<TeamInfoType[]>([
    
  ])

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const data = await api<TeamApiType>(`teams?country=${country}&season=${season}&league=${league}`)
    /* const data = await api<TeamApiType>(`teams?country=Brazil&season=2022&league=71`) */

    let newTeamsArr: TeamInfoType[] = []

    data.response.map(item => newTeamsArr.push(item.team))

    setTeams(newTeamsArr)
  }

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey')

    if (apiKey === null) {
      navigate('/')
    }

    setLeague('71')
  })

  useEffect(() => {
    setTeams([])
  }, [country, season, league])

  return (
    <>
      <Header />
      <main className={styles.home}>
        <h1 className={styles.title}>Buscar times</h1>
        <form className={styles.filter} onSubmit={(e) => handleSubmit(e)}>
          <CountrySelect country={country} setCountry={setCountry} />
          <SeasonSelect season={season} setSeason={setSeason} />
          {(country && season) ? <LeagueSelect country={country} season={season} setLeague={setLeague} /> : null}

          {league ? <button type='submit' className={styles.button}>Buscar</button> : null}

          {/* <button type='submit' className={styles.button}>Buscar</button> */}
        </form>

        {teams ?
          <section className={styles.teams__container}>
            {teams.map((team) => (
              <Link to={`/team/${league}/${season}/${team.id}`} key={team.id} className={styles.team}>
                <img src={team.logo} alt={team.name} />
                <p>{team.name}</p>
              </Link>
            ))}
          </section>

          : null
        }
      </main>
    </>
  )
}