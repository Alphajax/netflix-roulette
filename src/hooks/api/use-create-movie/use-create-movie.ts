import { useMutation } from '@tanstack/react-query'
import { postMovie } from './post-movie.ts'
import type { MovieFormData } from '../../../pages'

type CreateMovieProps = Omit<MovieFormData, 'id'>

export function useCreateMovie() {
  const { mutateAsync, isError, isPending, data } = useMutation({
    mutationFn: (movie: CreateMovieProps) => postMovie(movie),
  })

  return {
    create: mutateAsync,
    isError,
    isPending,
    created: data,
  }
}
