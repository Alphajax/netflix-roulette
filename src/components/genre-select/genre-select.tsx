import { Select, SelectOptions } from '../../ui'

type Props = {
  options: SelectOptions
  selected: string
  onSelect: (name: string) => void
}
export const GenreSelect = ({ options, onSelect, selected }: Props) => {
  return (
    <Select
      options={options}
      name={'Select Genre'}
      onSelect={onSelect}
      selectedOptions={[selected]}
      multiSelect={false}
    />
  )
}
