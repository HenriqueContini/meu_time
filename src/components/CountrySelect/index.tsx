import CountryType from '../../interfaces/countryType'
import api from '../../services/api'
import Select from '../Select'
import { useState, useEffect } from 'react'

interface CountryApiType {
  response: CountryType[]
}

interface CoutrySelectProps {
  country: string
  setCountry: (countryName: string) => void
}

export default function CountrySelect({ country, setCountry }: CoutrySelectProps) {
  const [countries, setCountries] = useState<CountryType[]>([])
  const [filteredCountries, setFilteredCountries] = useState<CountryType[]>([])

  const loadData = async (): Promise<void> => {
    const data = await api<CountryApiType>('countries')
    setCountries(data.response)
  }

  const filterCountries = (inputValue: string): void => {
    if (inputValue.length > 1) {
      setFilteredCountries(countries.filter(c => c.name.toUpperCase().includes(inputValue.toUpperCase())))
    } else {
      setFilteredCountries([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Select name='country'
      label='Selecione um país:'
      placeholder='Insira o nome de um país'
      selectedValue={country}
      setSelectedValue={setCountry}
      filterFunction={filterCountries}>
      <>
        {filteredCountries.map((c) => (
          <li key={c.name} onClick={() => setCountry(c.name)}>
            <img src={c.flag} alt={c.name} />
            <p>{c.name}</p>
          </li>
        ))}
      </>
    </Select>
  )
}