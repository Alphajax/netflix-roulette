import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './text-area.tsx'

const meta: Meta<typeof TextArea> = {
  component: TextArea,
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Primary: Story = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
  },
  name: 'ui/textarea',
}
