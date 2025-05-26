import type { Meta, StoryObj } from '@storybook/react'
import { AddMovie } from './add-movie.tsx'

const meta: Meta<typeof AddMovie> = {
  component: AddMovie,
}

export default meta
type Story = StoryObj<typeof AddMovie>

export const AddMovieComponent: Story = {
  args: {
    show: true,
    onSubmit: () => {
      console.log('onSubmit')
    },
    onClose: () => {
      console.log('onClose')
    },
  },
  name: 'Add Movie',
}
