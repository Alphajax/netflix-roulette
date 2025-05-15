import { useQuery } from '@tanstack/react-query'
import { getMovies } from './get-movies.ts'
import type { Movie } from '../../../types'

export interface UseGetMoviesOptions {
  search: string
  sortBy: string
  activeGenre: string
}

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

const mapMovies = (response: ApiResponse): Movie[] =>
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

export function useGetMovies(config: UseGetMoviesOptions) {
  return useQuery({
    queryKey: ['movies', config],
    queryFn: () =>
      getMovies({
        search: config.search,
        searchBy: 'title',
        sortBy: config.sortBy,
        sortOrder: 'asc',
        filter: [config.activeGenre],
      }),
    select: (data) => mapMovies(data),
  })
}
