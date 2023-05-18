import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CountrySelect from '../../components/CountrySelect'
import SeasonSelect from '../../components/SeasonSelect'
import LeagueSelect from '../../components/LeagueSelect'

export default function Home() {
  const navigate = useNavigate()
  const [country, setCountry] = useState<string>('Brazil')
  const [season, setSeason] = useState<string>('2020')
  const [league, setLeague] = useState<string>('')

  useEffect(() => {
    const apiKey = sessionStorage.getItem('apiKey')

    if (apiKey === null) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Header />
      <main className={styles.home}>
        <h1 className={styles.title}>Busque por um <span>time</span></h1>
        <div className={styles.filter}>
          <CountrySelect country={country} setCountry={setCountry} />
          <SeasonSelect season={season} setSeason={setSeason} />
          {/* Só renderizar o League se tiver country e season */}
          <LeagueSelect country={country} season={season} setLeague={setLeague}/>
        </div>
      </main>
    </>
  )
}