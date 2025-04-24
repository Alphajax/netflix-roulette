import type { IMovie } from '../../types'

export interface ApiMovie {
  id: number
  title: string
  poster_path: string
  genres: string[]
  release_date: string
  vote_average: number
  runtime: number
  overview: string
}

export interface ApiResponse {
  data: ApiMovie[]
}

export const mapMovies = (response: ApiResponse): IMovie[] =>
  response.data.map((movie) => ({
    id: movie.id.toString(),
    imgURL: movie.poster_path,
    name: movie.title,
    genres: movie.genres,
    year: new Date(movie.release_date).getFullYear().toString(),
    rating: movie.vote_average.toFixed(1),
    duration: `${movie.runtime.toString()} мин`,
    description: movie.overview,
  }))
