import { Select } from '../../ui'

import styles from './styles.module.scss'

interface Props {
  value: string
  onChange: (value: string) => void
}
export const SortControl = ({ value, onChange }: Props) => (
  <div className={styles.container}>
    <label className={styles.label} htmlFor="Sort By">
      Sort By
    </label>
    <Select
      initialSelectedOptions={[value]}
      multiSelect={false}
      name="Sort By"
      options={['RELEASE DATE', 'TITLE']}
      onSelect={onChange}
    />
  </div>
)
