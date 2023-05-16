import { useState } from 'react'
import styles from './Login.module.css'
import checkStatus from '../../services/checkStatus';

export default function Login() {
  const [apiKey, setApiKey] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const isStatusOk = await checkStatus(apiKey)

    if (isStatusOk) {
      setError(false)
    } else {
      setError(true)
    }
    
    setApiKey('')
  }

  return (
    <main className={styles.login}>
      <img src="meuTime__logo.png" alt="Logo Meu time" className={styles.logo} />
      <h1 className={styles.title}>Obtenha informações do seu time favorito</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="api__key">Insira sua API Key</label>
        <input type="text" name="api__key" id="api__key" value={apiKey} onChange={(e) => handleChange(e)} required />
        {error ? <span className={styles.error}> API Key inválida </span> : null}
        <button type="submit">Fazer login</button>
      </form>
    </main>
  )
}