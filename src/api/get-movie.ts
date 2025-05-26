import axiosClient from './axiosClient.ts'
import type { Movie } from '../types'

type ApiResponse = Movie

export const getMovie = async (id: string) => {
  const response = await axiosClient.get<ApiResponse>('/movies/' + id)
  return response.data
}
