import type { Meta, StoryObj } from '@storybook/react'
import { SortControl } from './sort-control.tsx'
import './styles.module.scss'
import { useArgs } from '@storybook/preview-api'

const meta: Meta<typeof SortControl> = {
  component: SortControl,
}

export default meta
type Story = StoryObj<typeof SortControl>

export const Primary: Story = {
  args: {
    value: 'RELEASE DATE',
  },
  render: function Render() {
    const [{ value }, updateArgs] = useArgs()

    function onSelect(option: string) {
      updateArgs({ selected: option })
    }
    return <SortControl value={value} onChange={onSelect} />
  },
}
