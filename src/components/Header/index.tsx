import styles from './Header.module.css'
import logo from '../../assets/meuTime__logo.png'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <img src={logo} alt="Logo Meu time" className={styles.img} />
        <h1>Meu time</h1>
      </div>
      <nav className={styles.nav}>
        <Link to='/home' className={styles.link}>Início</Link>
      </nav>
    </header>
  )
}