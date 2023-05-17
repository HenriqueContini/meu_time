import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../../components/Header'
import CountriesSelect from '../../components/CountriesSelect'

export default function Home() {
  const navigate = useNavigate()

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
        <h1 className={styles.title}>Busque por um time</h1>
        <div className={styles.filter}>
          <CountriesSelect />
        </div>
      </main>
    </>
  )
}