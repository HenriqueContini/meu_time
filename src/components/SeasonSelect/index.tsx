import api from "../../services/api";
import Select from "../Select";
import { useEffect, useState } from "react";

interface SeasonApiType {
  response: number[]
}

export default function SeasonSelect() {
  const [seasons, setSeasons] = useState<number[]>([])
  const [filteredSeasons, setFilteredSeasons] = useState<number[]>([])

  const loadData = async (): Promise<void> => {
    const data = await api<SeasonApiType>('leagues/seasons')
    setSeasons(data.response)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let string = event.target.value

    if (!Number.isNaN(Number(string)) && string.length > 0) {
      setFilteredSeasons(seasons.filter(s => s.toString().includes(string)))
    } else {
      setFilteredSeasons([])
    }
  }

  useEffect(() => {
    /* loadData() */
  }, [])

  return (
    <Select name="season" label="Selecione a temporada:" placeholder="Insira um ano" handleChange={e => handleChange(e)}>
      <ul>
        {filteredSeasons.map((s, index) => (
          <li key={index}>
            <p>{s}</p>
          </li>
        ))}
      </ul>
    </Select>
  )
}