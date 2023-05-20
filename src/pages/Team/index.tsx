import { useParams } from 'react-router-dom'
import styles from './Team.module.css'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import TeamType from '../../interfaces/teamType'
import api from '../../services/api'
import PlayerType from '../../interfaces/playerType'
import GridTable from '../../components/GridTable'

interface TeamApiTypes {
  response: TeamType
}

interface PlayerApiTypes {
  response: {
    player: PlayerType
  }[]
}

export default function Team() {
  const [teamData, setTeamData] = useState<TeamType>()
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [mostUsedLineup, setMostUsedLineup] = useState<{ formation: string, played: number }>()

  const params = useParams()

  const loadData = async (): Promise<void> => {
    const team = await api<TeamApiTypes>(`teams/statistics?league=${params.league}&season=${params.season}&team=${params.team}`)
    setTeamData(team.response)

    if (team.response.lineups.length > 0) {
      setMostUsedLineup(team.response.lineups[0])
      team.response.lineups.map(item => item.played > mostUsedLineup!.played && setMostUsedLineup(item))
    }

    const player = await api<PlayerApiTypes>(`players?league=${params.league}&season=${params.season}&team=${params.team}`)
    let newPlayerArr: PlayerType[] = []
    player.response.map(item => newPlayerArr.push(item.player))
    setPlayers(newPlayerArr)
  }

  useEffect(() => {
    /* loadData() */
  }, [])

  return (
    <>
      <Header />
      {teamData &&
        <main className={styles.team}>
          <section className={styles.banner}>
            <h1>{teamData.team.name}</h1>
            <img src={`https://media.api-sports.io/football/teams/${teamData.team.id}.png`} alt={teamData.team.name} />
          </section>
          <section className={styles.results}>
            <h2>Resultados</h2>

            <p className={styles.results__text}>Liga: <span>{teamData.league.name}</span> - Temporada: <span>{teamData.league.season}</span></p>

            <GridTable headers={['', 'Quantidade']}>
              <>
                <p>Vitórias</p>
                <p>{teamData.fixtures.wins.total}</p>
                <p>Empates</p>
                <p>{teamData.fixtures.draws.total}</p>
                <p>Derrotas</p>
                <p>{teamData.fixtures.loses.total}</p>
                <p>Jogos</p>
                <p>{teamData.fixtures.played.total}</p>
              </>
            </GridTable>

            {mostUsedLineup &&
              <p className={styles.results__text}>A formação mais utilizada foi: <span>{mostUsedLineup.formation}</span>, com um total de <span>{mostUsedLineup.played}</span> vezes.</p>
            }
          </section>
          <section className={styles.players}>
            <h2>Jogadores</h2>

            <GridTable headers={['Jogador', 'Idade', 'Nascimento']}>
              <>
                {players.map((i) => (
                  <>
                    <p>{i.name}</p>
                    <p>{i.age}</p>
                    <p>{i.nationality}</p>
                  </>
                ))}
              </>
            </GridTable>
          </section>
        </main >
      }
    </>
  )
}