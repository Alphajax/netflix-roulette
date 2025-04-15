import type { SelectOptions } from '../../ui'
import { Select } from '../../ui'
import { useId } from 'react'
import styles from './styles.module.scss'

export interface GenreSelectProps {
  name: string
  options: SelectOptions
  selected: string[]
  onSelect: (name: string[]) => void
}

export const GenreSelect = ({ options, onSelect, selected, name }: GenreSelectProps) => {
  const id = useId()
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        Select Genre
      </label>
      <Select
        multiSelect
        id={id}
        initialSelectedOptions={selected}
        name={name}
        options={options}
        placeholder="Select Genre"
        onSelect={onSelect}
      />
    </div>
  )
}
