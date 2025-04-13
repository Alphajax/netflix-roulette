import type { IMovie } from '../../types'

export const convertFormDataToMovie = (fd: Record<string, string | undefined>): IMovie => ({
  name: fd.name ?? '',
  id: fd.id ?? '',
  imgURL: fd.imgURL ?? '',
  genres: (fd.genres ?? '').split(','),
  year: fd.year ?? '0',
  rating: fd.rating ?? '0.0',
  duration: fd.duration ?? '0h 0m',
  description: fd.description ?? '',
})
