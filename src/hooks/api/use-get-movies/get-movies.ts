import axiosClient from '../axiosClient.ts'
import type { ApiResponse, UseGetMoviesOptions } from './use-get-movies.ts'

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
