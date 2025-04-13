import type { Meta, StoryObj } from '@storybook/react'
import { DeleteMovie } from './delete-movie.tsx'

const meta: Meta<typeof DeleteMovie> = {
  component: DeleteMovie,
}

export default meta
type Story = StoryObj<typeof DeleteMovie>

export const DeleteMovieComponent: Story = {
  args: {
    show: true,
    onSubmit: () => {
      console.log('onSubmit')
    },
    onClose: () => {
      console.log('onClose')
    },
  },
  name: 'Delete Movie',
}
