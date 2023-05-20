import styles from './TeamError.module.css'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'

export default function TeamError() {
  return (
    <>
    <Header />
    <main className={styles.teamError}>
      <h2>Ocorreu um problema ao carregar os dados</h2>

      <Link className={styles.button} to='/home'>Voltar para o início</Link>
    </main>
    </>
  )
}