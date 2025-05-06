import type { Movie } from '../../types'

export const convertFormDataToMovie = (
  formData: Record<string, string | undefined>,
  id?: string,
): Movie => ({
  name: formData.name ?? '',
  id: id ?? '',
  imgURL: formData.imgURL ?? '',
  genres: (formData.genres ?? '').split(','),
  year: formData.year ?? '0',
  rating: formData.rating ?? '0.0',
  duration: formData.duration ?? '0h 0m',
  description: formData.description ?? '',
})
