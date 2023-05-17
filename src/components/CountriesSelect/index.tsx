import CountryType from '../../interfaces/countryType'
import api from '../../services/api'
import styles from './CountriesSelect.module.css'
import { useState, useEffect } from 'react'

interface CountryApiType {
  response: CountryType[]
}

export default function CountriesSelect(/* Recebe o country da home */) {
  const [countries, setCountries] = useState<CountryType[]>([])
  const [filteredCountries, setFilteredCountries] = useState<CountryType[]>([])

  const loadData = async (): Promise<void> => {
    const data = await api<CountryApiType>('countries')
    setCountries(data.response)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let string = event.target.value

    if (string.length > 1) {
      setFilteredCountries(countries.filter(c => c.name.toUpperCase().includes(string.toUpperCase())))
    } else [
      setFilteredCountries([])
    ]
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <fieldset className={styles.countries__container}>
      <label htmlFor="country" className={styles.label}>Selecione um país: </label>
      <input type="search" name='country' className={styles.input} onChange={(e) => handleChange(e)} />

      <div className={styles.countries}>
        {filteredCountries.map((c) => (
          <div key={c.name} className={styles.country}>
            <img src={c.flag} alt={c.name} />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
    </fieldset>
  )
}