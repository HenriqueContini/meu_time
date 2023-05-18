import api from "../../services/api";
import Select from "../Select";
import { useEffect, useState } from "react";

interface SeasonApiType {
  response: number[]
}

interface SeasonSelectProps {
  season: string
  setSeason: (year: string) => void
}

export default function SeasonSelect({ season, setSeason }: SeasonSelectProps) {
  const [seasons, setSeasons] = useState<number[]>([])
  const [filteredSeasons, setFilteredSeasons] = useState<number[]>([])

  const loadData = async (): Promise<void> => {
    const data = await api<SeasonApiType>('leagues/seasons')
    setSeasons(data.response)
  }

  const filterSeasons = (inputValue: string): void => {
    if (!Number.isNaN(Number(inputValue)) && inputValue.length > 0) {
      setFilteredSeasons(seasons.filter(s => s.toString().includes(inputValue)))
    } else {
      setFilteredSeasons([])
    }
  }

  useEffect(() => {
    /* loadData() */
  }, [])

  return (
    <Select name="season"
      label="Selecione a temporada:"
      placeholder="Insira um ano"
      selectedValue={season}
      setSelectedValue={setSeason}
      filterFunction={filterSeasons}>
      <>
        {filteredSeasons.map((s, index) => (
          <li key={index} onClick={() => setSeason(String(s))}>
            <p>{s}</p>
          </li>
        ))}
      </>
    </Select>
  )
}