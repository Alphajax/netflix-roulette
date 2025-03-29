import type { Meta, StoryObj } from '@storybook/react'

import { Search } from './search'
import { useArgs } from '@storybook/preview-api'

const meta: Meta<typeof Search> = {
  component: Search,
}

export default meta
type Story = StoryObj<typeof Search>

export const Primary: Story = {
  args: {
    initialSearch: 'initial',
  },
  render: function Render() {
    const [{ initialSearch }] = useArgs()

    function onSearch(msg: string) {
      alert(msg)
    }

    return <Search initialSearch={initialSearch} onSearch={onSearch} />
  },
}
