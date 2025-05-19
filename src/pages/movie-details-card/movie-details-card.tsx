import { useLoaderData } from 'react-router-dom'
import type { Movie } from '../../types'
import { MovieDetails } from '../../components'

export const MovieDetailsCard = () => {
  const data = useLoaderData<Movie>()

  return (
    <MovieDetails
      description={data.description}
      duration={data.duration}
      genres={data.genres}
      id={data.id}
      imgURL={data.imgURL}
      name={data.name}
      rating={data.rating}
      year={data.year}
    />
  )
}
