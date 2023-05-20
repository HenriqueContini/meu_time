import styles from './NotFound.module.css'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
    <Header />
    <main className={styles.notFound}>
      <h2>Página não encontrada...</h2>

      <Link className={styles.button} to='/home'>Voltar para o início</Link>
    </main>
    </>
  )
}