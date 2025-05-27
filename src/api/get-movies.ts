import axiosClient from './axiosClient.ts'
import type { UseGetMoviesOptions } from '../hooks/use-get-movies/use-get-movies.ts'
import type { Movie } from '../types'

export interface ApiResponse {
  data: Movie[]
}

interface GetMoviesOptions extends Omit<UseGetMoviesOptions, 'activeGenre'> {
  sortOrder?: 'asc' | 'desc'
  searchBy?: string
  filter?: string
}
export const getMovies = async (params: GetMoviesOptions) => {
  const response = await axiosClient.get<ApiResponse>('/movies', {
    params,
  })
  return response.data
}
