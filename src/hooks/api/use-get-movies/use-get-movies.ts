import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from './get-movies.ts'
import { getMovies } from './get-movies.ts'
import type { Movie } from '../../../types'

export interface UseGetMoviesOptions {
  search: string
  sortBy: string
  activeGenre: string
}

const mapMovies = (response: ApiResponse): Movie[] => response.data

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
