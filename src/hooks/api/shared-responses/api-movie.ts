import type { Movie } from '../../../types'

export interface ApiMovie {
  id: number
  title: string
  poster_path: string
  genres: string[]
  release_date: string
  vote_average: number
  runtime?: number
  overview: string
}

export const mapMovie = (apiMovie: ApiMovie): Movie => ({
  id: apiMovie.id.toString(),
  imgURL: apiMovie.poster_path,
  name: apiMovie.title,
  genres: apiMovie.genres,
  year: new Date(apiMovie.release_date).getFullYear().toString(),
  rating: apiMovie.vote_average.toFixed(1),
  duration: `${apiMovie.runtime?.toString() ?? '0'} мин`,
  description: apiMovie.overview,
})
