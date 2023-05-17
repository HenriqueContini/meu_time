import CountryType from '../../interfaces/countryType'
import api from '../../services/api'
import Select from '../Select'
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
    } else {
      setFilteredCountries([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Select name='country' label='Selecione um país:' handleChange={handleChange}>
      <ul>
        {filteredCountries.map((c) => (
          <li key={c.name}>
            <img src={c.flag} alt={c.name} />
            <p>{c.name}</p>
          </li>
        ))}
      </ul>
    </Select>
  )
}