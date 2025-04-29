import { useParams } from 'react-router-dom'
import { useRequest } from '../../hooks/use-request.ts'
import type { ApiMovie } from '../movie-list-page/utils.ts'
import { mapMovie } from '../movie-list-page/utils.ts'
import { useEffect, useMemo } from 'react'
import { MovieDetails } from '../movie-details'

export const MovieDetailsContainer = () => {
  const { movieId = '' } = useParams()

  const { run, data, loading, error } = useRequest<ApiMovie>({
    url: 'http://localhost:4000/movies/' + movieId,
  })
  useEffect(() => {
    void run()
  }, [movieId])

  const movie = useMemo(() => (data ? mapMovie(data) : null), [data])

  if (loading || error || !movie) return null

  return <MovieDetails {...movie} />
}
