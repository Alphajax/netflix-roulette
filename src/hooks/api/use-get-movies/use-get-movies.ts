import { useQuery } from '@tanstack/react-query'
import { getMovies } from './get-movies.ts'
import type { Movie } from '../../../types'
import type { ApiMovie } from '../shared-responses'
import { mapMovie } from '../shared-responses'

export interface UseGetMoviesOptions {
  search: string
  sortBy: string
  activeGenre: string
}

export interface ApiResponse {
  data: ApiMovie[]
}

const mapMovies = (response: ApiResponse): Movie[] =>
  response.data.map((item) => ({ ...mapMovie(item) }))

export function useGetMovies(config: UseGetMoviesOptions) {
  return useQuery({
    queryKey: ['movies', config.search, config.sortBy, config.activeGenre],
    queryFn: () =>
      getMovies({
        search: config.search,
        searchBy: 'title',
        sortBy: config.sortBy,
        sortOrder: 'asc',
        filter: config.activeGenre,
      }),
    select: (data) => mapMovies(data),
  })
}
