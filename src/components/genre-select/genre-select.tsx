import type { SelectOptions } from '../../ui'
import { Select } from '../../ui'
import { useId } from 'react'
import styles from './styles.module.scss'

export interface GenreSelectProps {
  options: SelectOptions
  value: string[]
  onChange: (name: string[]) => void
  error?: string;
}

export const GenreSelect = ({ options, onChange, value, error }: GenreSelectProps) => {
  const id = useId()
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        Select Genre
      </label>
      <Select
        multiSelect
        id={id}
        initialSelectedOptions={value}
        name="genres"
        options={options}
        placeholder="Select Genre"
        onSelect={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  )
}
