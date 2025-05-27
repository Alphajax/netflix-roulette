import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MovieForm } from './movie-form.tsx'
import { expect } from 'vitest'

const mockProps = {
  initialMovieInfo: {
    imgURL:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/4716873/85b585ea-410f-4d1c-aaa5-8d242756c2a4/300x450',
    name: 'Бойцовский клуб',
    date: '1999',
    rating: '8.7',
    duration: '2ч 19м',
    genres: ['триллер', 'криминал', 'драма'],
    description:
      'Сотрудник страховой компании страдает хронической бессонницей и отчаянно пытается вырваться из мучительно скучной жизни. Однажды в очередной командировке он встречает некоего Тайлера Дёрдена — харизматического торговца мылом с извращенной философией. Тайлер уверен, что самосовершенствование — удел слабых, а единственное, ради чего стоит жить, — саморазрушение.' +
      'Проходит немного времени, и вот уже новые друзья лупят друг друга почем зря на стоянке перед баром, и очищающий мордобой доставляет им высшее блаженство. Приобщая других мужчин к простым радостям физической жестокости, они основывают тайный Бойцовский клуб, который начинает пользоваться невероятной популярностью.',
    id: '361',
  },
}

describe('MovieForm', () => {
  test('renders correctly without exisint item', () => {
    render(<MovieForm onSubmit={vi.fn()} />)
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Select Date' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Movie Url' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Rating' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Runtime' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Overview' })).toBeInTheDocument()
  })

  test('renders correctly with given props', () => {
    render(<MovieForm initialMovieInfo={mockProps.initialMovieInfo} onSubmit={vi.fn()} />)
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue(
      mockProps.initialMovieInfo.name,
    )
    expect(screen.getByRole('textbox', { name: 'Select Date' })).toHaveValue(
      mockProps.initialMovieInfo.date,
    )
    expect(screen.getByRole('textbox', { name: 'Movie Url' })).toHaveValue(
      mockProps.initialMovieInfo.imgURL,
    )
    expect(screen.getByRole('textbox', { name: 'Rating' })).toHaveValue(
      mockProps.initialMovieInfo.rating,
    )
    expect(screen.getByRole('textbox', { name: 'Runtime' })).toHaveValue(
      mockProps.initialMovieInfo.duration,
    )
    expect(screen.getByRole('textbox', { name: 'Overview' })).toHaveValue(
      mockProps.initialMovieInfo.description,
    )
  })

  test('after submit button clicked, "onSubmit" callback should be called', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MovieForm initialMovieInfo={mockProps.initialMovieInfo} onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(mockProps.initialMovieInfo)
    onSubmit.mockClear()
    await user.clear(screen.getByRole('textbox', { name: 'Rating' }))
    await user.type(screen.getByRole('textbox', { name: 'Rating' }), '7.0')
    await user.click(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({ ...mockProps.initialMovieInfo, rating: '7.0' })
  })

  test('genres should be able to be selected', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<MovieForm initialMovieInfo={mockProps.initialMovieInfo} onSubmit={onSubmit} />)
    await user.click(screen.getByText('триллер, криминал, драма'))
    await user.click(screen.getByTestId('select-option-криминал'))
    expect(screen.getByText('триллер, драма')).toBeInTheDocument()
  })
})
