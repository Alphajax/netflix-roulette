import type { SelectOptions } from '../../ui'
import { Select } from '../../ui'

export interface GenreSelectProps {
  options: SelectOptions
  selected: string
  onSelect: (name: string) => void
}
export const GenreSelect = ({ options, onSelect, selected }: GenreSelectProps) => (
  <Select
    initialSelectedOptions={[selected]}
    multiSelect={false}
    name="Select Genre"
    options={options}
    onSelect={onSelect}
  />
)
