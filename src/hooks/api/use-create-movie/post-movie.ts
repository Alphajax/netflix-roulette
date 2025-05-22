import axiosClient from '../axiosClient.ts'
import type { Movie } from '../../../types'
import type { MovieFormData } from '../../../pages'

type ApiResponse = Movie
export const postMovie = async (params: MovieFormData) => {
  const response = await axiosClient.post<ApiResponse>('/movies', params)
  return response.data
}
