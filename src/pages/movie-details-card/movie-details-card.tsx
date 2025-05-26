import { useLoaderData } from 'react-router-dom'
import type { Movie } from '../../types'
import { MovieDetails } from '../../components'

export const MovieDetailsCard = () => {
  const data = useLoaderData<Movie>()

  return <MovieDetails {...data} />
}
