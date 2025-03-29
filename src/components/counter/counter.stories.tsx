import type { Meta, StoryObj } from '@storybook/react'
import { Counter } from './counter.ts'
import './counter.module.scss'
import '../../styles/global.scss'

const meta: Meta<typeof Counter> = {
  component: Counter,
}

export default meta

type Story = StoryObj<typeof Counter>
export const Default: Story = {
  name: 'Counter story :)',
  args: {
    initialValue: 8,
  },
}
