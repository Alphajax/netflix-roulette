import type { SelectOptions } from '../../ui'
import { Select } from '../../ui'
import { useId } from 'react'
import styles from './styles.module.scss'

export interface GenreSelectProps {
  options: SelectOptions
  selected: string[]
  onSelect: (name: string[]) => void
}

export const GenreSelect = ({ options, onSelect, selected }: GenreSelectProps) => {
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
        name="genres"
        options={options}
        placeholder="Select Genre"
        onSelect={onSelect}
      />
    </div>
  )
}
