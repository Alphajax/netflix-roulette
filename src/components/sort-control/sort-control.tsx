import { Select } from '../../ui'

import styles from './styles.module.scss'
import { useId } from 'react'

interface SortControlProps {
  value: string
  onChange: (value: string) => void
}
export const SortControl = ({ value, onChange }: SortControlProps) => {
  const id = useId()
  const handleSortSelectChange = ([newValue]: string[]) => {
    onChange(newValue)
  }
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={id}>
          Sort By
        </label>
      </div>
      <Select
        id={id}
        initialSelectedOptions={[value]}
        multiSelect={false}
        name="Sort By"
        options={['RELEASE DATE', 'TITLE']}
        onSelect={handleSortSelectChange}
      />
    </div>
  )
}
