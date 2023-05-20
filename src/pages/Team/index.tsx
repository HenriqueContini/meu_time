import { useNavigate, useParams } from 'react-router-dom'
import styles from './Team.module.css'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import TeamType from '../../interfaces/teamType'
import api from '../../services/api'
import PlayerType from '../../interfaces/playerType'
import GridTable from '../../components/GridTable'
import Chart from '../../components/Chart'
import logo from '../../assets/meuTime__logo.png'

interface TeamApiType {
  response: TeamType
}

interface PlayerApiType {
  response: {
    player: PlayerType
  }[]
}

export default function Team() {
  const params = useParams()
  const navigate = useNavigate()
  const [teamData, setTeamData] = useState<TeamType>()
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [mostUsedLineup, setMostUsedLineup] = useState<{ formation: string, played: number }>()
  const [graphData, setGraphData] = useState<{ key: string, total: number | null }[]>([])

  const loadGraph = (info: any): void => {
    let arrOfMinutes: { key: string, total: number | null }[] = []

    let item: keyof typeof info.minute;
    for (item in info.minute) {
      arrOfMinutes.push({ key: item, total: info.minute[item].total })
    }
    setGraphData(arrOfMinutes)
  }

  const loadData = async (): Promise<void> => {
    try {
      const team = await api<TeamApiType>(`teams/statistics?league=${params.league}&season=${params.season}&team=${params.team}`)
      setTeamData(team.response)

      let lineup: { formation: string, played: number }

      team.response.lineups.forEach((item, index) => {
        if (index === 0) {
          lineup = item
        } else {
          if (item.played > lineup.played) {
            lineup = item
          }
        }

        setMostUsedLineup(lineup)
      })

      const player = await api<PlayerApiType>(`players?league=${params.league}&season=${params.season}&team=${params.team}`)
      let newPlayerArr: PlayerType[] = []

      player.response.map(item => newPlayerArr.push({ name: item.player.name, age: item.player.age, nationality: item.player.nationality }))
      setPlayers(newPlayerArr)

      loadGraph(team.response.goals.for)
    } catch (e) {
      navigate('/team_error')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Header />
      {teamData ?
        <main className={styles.team}>
          <section className={styles.banner}>
            <h1>{teamData.team.name}</h1>
            <img src={`https://media.api-sports.io/football/teams/${teamData.team.id}.png`} alt={teamData.team.name} />
          </section>
          <section className={styles.results}>
            <h2>Resultados</h2>

            <p className={styles.results__text}>Liga: <span>{teamData.league.name}</span> - Temporada: <span>{teamData.league.season}</span></p>

            <GridTable
              headers={['', 'Quantidade']}
              rows={[
                { type: 'Vitórias', total: teamData.fixtures.wins.total },
                { type: 'Empates', total: teamData.fixtures.draws.total },
                { type: 'Derrotas', total: teamData.fixtures.loses.total },
                { type: 'Jogos', total: teamData.fixtures.played.total }
              ]}
            />

            {mostUsedLineup &&
              <p className={styles.results__text}>A formação mais utilizada foi: <span>{mostUsedLineup.formation}</span>, com um total de <span>{mostUsedLineup.played}</span> vezes.</p>
            }

            {graphData && <Chart chartData={graphData} />}
          </section>
          <section className={styles.players}>
            <h2>Jogadores</h2>

            <GridTable headers={['Jogador', 'Idade', 'Nascimento']} rows={players.map(i => i)} />
          </section>
        </main >

        : <main className={styles.loading}>
          <h2>Carregando dados...</h2>

          <img src={logo} alt="Logo girando" />
        </main>
      }
    </>
  )
}