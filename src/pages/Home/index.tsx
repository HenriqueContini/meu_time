import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
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
  const [season, setSeason] = useState<string>('2013')
  const [league, setLeague] = useState<string>('71')

  const [teams, setTeams] = useState<TeamInfoType[]>([
      {
        "id": 134,
        "name": "Atletico Paranaense",
        "logo": "https://media-2.api-sports.io/football/teams/134.png"
      },
      {
        "id": 144,
        "name": "Atletico Goianiense",
        "logo": "https://media-3.api-sports.io/football/teams/144.png"
      },
      {
        "id": 145,
        "name": "Avai",
        "logo": "https://media-1.api-sports.io/football/teams/145.png"
      },
      {
        "id": 147,
        "name": "Coritiba",
        "logo": "https://media-3.api-sports.io/football/teams/147.png"
      },
      {
        "id": 151,
        "name": "Goias",
        "logo": "https://media-1.api-sports.io/football/teams/151.png"
      },
      {
        "id": 152,
        "name": "Juventude",
        "logo": "https://media-3.api-sports.io/football/teams/152.png"
      },
      {
        "id": 154,
        "name": "Fortaleza EC",
        "logo": "https://media-2.api-sports.io/football/teams/154.png"
      },
      {
        "id": 794,
        "name": "RB Bragantino",
        "logo": "https://media-3.api-sports.io/football/teams/794.png"
      },
      {
        "id": 1062,
        "name": "Atletico-MG",

        "logo": "https://media-3.api-sports.io/football/teams/1062.png"
      },
      {
        "id": 1193,
        "name": "Cuiaba",
        "logo": "https://media-1.api-sports.io/football/teams/1193.png"
      }
  ])

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    /* const data = await api<TeamApiType>(`teams?country=${country}&season=${season}&league=${league}`) */
    const data = await api<TeamApiType>(`teams?country=Brazil&season=2022&league=71`)
    data.response.map(team => setTeams([...teams, team.team]))
  }

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey')

    if (apiKey === null) {
      navigate('/')
    }
  }, [])

  /* useEffect(() => {
    setTeams([])
  }, [country, season, league]) */

  return (
    <>
      <Header />
      <main className={styles.home}>
        <h1 className={styles.title}>Buscar <span>times</span></h1>
        <form className={styles.filter} onSubmit={(e) => handleSubmit(e)}>
          <CountrySelect country={country} setCountry={setCountry} />
          <SeasonSelect season={season} setSeason={setSeason} />
          {(country && season) ? <LeagueSelect country={country} season={season} setLeague={setLeague} /> : null}

          {/* {league ? <button type='submit' className={styles.button}>Buscar</button> : null} */}

          <button type='submit' className={styles.button}>Buscar</button>
        </form>

        {teams ?
          <section className={styles.teams__container}>
            {teams.map((team) => (
              <div key={team.id} className={styles.team}>
                <img src={team.logo} alt={team.name} />
                <p>{team.name}</p>
              </div>
            ))}
          </section>

          : null
        }
      </main>
    </>
  )
}