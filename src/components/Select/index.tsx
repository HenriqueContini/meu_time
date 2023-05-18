import React, { useState, useEffect } from 'react'
import styles from './Select.module.css'
import { IoMdClose } from 'react-icons/io'

interface SelectProps {
  children: React.ReactNode
  name: string
  label: string
  placeholder: string
  selectedValue: string
  setSelectedValue: (newValue: string) => void
  filterFunction: (inputValue: string) => void
}

export default function Select({ children, name, label, placeholder, filterFunction, selectedValue, setSelectedValue }: SelectProps) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value

    setInputValue(value)
    setSelectedValue('')
    filterFunction(value)
  }

  useEffect(() => {
    selectedValue ? setInputValue(selectedValue) : null
  }, [selectedValue])

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <div className={styles.input__container}>
        <input type='search' name={name} className={styles.input} value={inputValue} placeholder={placeholder} onChange={(e) => handleChange(e)} />
        <div className={styles.clearInput} onClick={() => {
          setInputValue('')
          setSelectedValue('')
        }}>
          <IoMdClose/>
        </div>
      </div>

      {!selectedValue ?
        <ul>
          {children}
        </ul>

        : null
      }
    </fieldset>
  )
}