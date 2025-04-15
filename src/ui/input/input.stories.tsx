import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input.tsx'

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
  },
  name: 'ui/Input',
}
