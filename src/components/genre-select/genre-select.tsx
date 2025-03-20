import type { SelectOptions } from '../../ui'
import { Select } from '../../ui'

interface Props {
  options: SelectOptions
  selected: string
  onSelect: (name: string) => void
}
export const GenreSelect = ({ options, onSelect, selected }: Props) => (
  <Select
    multiSelect={false}
    name="Select Genre"
    options={options}
    selectedOptions={[selected]}
    onSelect={onSelect}
  />
)
