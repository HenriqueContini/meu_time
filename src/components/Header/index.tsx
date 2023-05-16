import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="meuTime__logo.png" alt="Logo Meu time" className={styles.img}/>
    </header>
  )
}