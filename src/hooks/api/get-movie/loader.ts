import { getMovie } from './get-movie.ts'
import { mapMovie } from '../shared-responses'

export const getMovieLoader = async ({ params }: { params: { movieId?: string } }) => {
  if (!params.movieId) {
    throw new Error('No Movie Id')
  }
  return await getMovie(params.movieId).then(mapMovie)
}
