import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MovieDetails } from './movie-details.tsx'

const mockProps = {
  id: '1',
  imgURL:
    'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4b27e219-a8a5-4d85-9874-57d6016e0837/600x900',
  name: 'Зеленая книга',
  year: '2018',
  rating: '8.5',
  duration: '2ч 10м',
  genres: ['биография', 'комедия', 'драма'],
  description:
    '1960-е годы. После закрытия нью-йоркского ночного клуба на ремонт вышибала Тони по прозвищу Болтун ищет подработку на пару месяцев. Как раз в это время Дон Ширли — утонченный светский лев, богатый и талантливый чернокожий музыкант, исполняющий классическую музыку — собирается в турне по южным штатам, где ещё сильны расистские убеждения и царит сегрегация. Он нанимает Тони в качестве водителя, телохранителя и человека, способного решать текущие проблемы. У этих двоих так мало общего, и эта поездка навсегда изменит жизнь обоих.',
}

describe('MovieDetails component', () => {
  test('renders movie details correctly', () => {
    render(<MovieDetails {...mockProps} />)

    const image = screen.getByRole('presentation')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProps.imgURL)

    const name = screen.getByText(mockProps.name)
    expect(name).toBeInTheDocument()

    const rating = screen.getByText(mockProps.rating.toString())
    expect(rating).toBeInTheDocument()

    const genres = screen.getByText(mockProps.genres.join(', '))
    expect(genres).toBeInTheDocument()

    const yearAndDuration = screen.getByText(mockProps.year.toString())
    expect(yearAndDuration).toBeInTheDocument()
    expect(screen.getByText(mockProps.duration)).toBeInTheDocument()

    const description = screen.getByText(mockProps.description)
    expect(description).toBeInTheDocument()
  })

  test('renders the genres as a comma-separated list', () => {
    render(<MovieDetails {...mockProps} />)

    const genres = screen.getByText(mockProps.genres.join(', '))
    expect(genres).toBeInTheDocument()
  })
})
