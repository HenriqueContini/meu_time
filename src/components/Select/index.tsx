import styles from './Select.module.css'

interface SelectProps {
  children: React.ReactNode
  name: string
  label: string
  placeholder: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Select({ children, name, label, placeholder, handleChange }: SelectProps) {
  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <input type='search' name={name} className={styles.input} placeholder={placeholder} onChange={(e) => handleChange(e)} />
      {children}
    </fieldset>
  )
}
