import type { Meta, StoryObj } from '@storybook/react'

import { GenreSelect } from './genre-select.tsx'
import { useArgs } from '@storybook/preview-api'
import { genres } from '../../utils'

const meta: Meta<typeof GenreSelect> = {
  component: GenreSelect,
}

export default meta
type Story = StoryObj<typeof GenreSelect>

export const Primary: Story = {
  args: {
    selected: [],
    options: genres,
  },
  render: function Render() {
    const [{ selected, options }, updateArgs] = useArgs()

    function onSelect(option: string[]) {
      updateArgs({ selected: option })
    }

    return <GenreSelect options={options} selected={selected} onSelect={onSelect} />
  },
}
