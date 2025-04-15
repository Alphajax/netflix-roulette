import type { Meta, StoryObj } from '@storybook/react'
import './styles.module.scss'
import { MovieForm } from './movie-form.tsx'

const meta: Meta<typeof MovieForm> = {
  component: MovieForm,
}

export default meta
type Story = StoryObj<typeof MovieForm>

export const AddMovie: Story = {
  args: {},
}

export const EditMovie: Story = {
  args: {
    initialMovieInfo: {
      imgURL:
        'https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/85b585ea-410f-4d1c-aaa5-8d242756c2a4/300x450',
      name: 'Бойцовский клуб',
      year: '1999',
      rating: '8.7',
      duration: '2ч 19м',
      genres: ['триллер', 'криминал', 'драма'],
      description:
        'Сотрудник страховой компании страдает хронической бессонницей и отчаянно пытается вырваться из мучительно скучной жизни. Однажды в очередной командировке он встречает некоего Тайлера Дёрдена — харизматического торговца мылом с извращенной философией. Тайлер уверен, что самосовершенствование — удел слабых, а единственное, ради чего стоит жить, — саморазрушение.' +
        'Проходит немного времени, и вот уже новые друзья лупят друг друга почем зря на стоянке перед баром, и очищающий мордобой доставляет им высшее блаженство. Приобщая других мужчин к простым радостям физической жестокости, они основывают тайный Бойцовский клуб, который начинает пользоваться невероятной популярностью.',
      id: '361',
    },
    onSubmit: (movie) => {
      console.log(movie)
    },
  },
}
