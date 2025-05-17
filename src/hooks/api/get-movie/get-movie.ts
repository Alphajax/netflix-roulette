import axiosClient from '../axiosClient.ts'
import type { ApiMovie } from '../shared-responses'

type ApiResponse = ApiMovie

export const getMovie = async (id: string) => {
  const response = await axiosClient.get<ApiResponse>('/movies/' + id)
  return response.data
}
