import type { Meta, StoryObj } from '@storybook/react'
import { MovieTitle } from './movie-title.tsx'
import './styles.module.scss'

const meta: Meta<typeof MovieTitle> = {
  component: MovieTitle,
}

export default meta
type Story = StoryObj<typeof MovieTitle>

export const Primary: Story = {
  args: {
    imgURL:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900',
    name: 'Интерстеллар',
    year: 2014,
    genres: ['фантастика', 'драма', 'приключения'],
  },
}
