import { AddMovie } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useCreateMovie } from '../../hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { movieSchema } from '../../utils'

export type MovieFormData = z.infer<typeof movieSchema>

export const AddMovieForm = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    void navigate('/')
  }

  const { create } = useCreateMovie()

  const handleSubmit = async (movie: MovieFormData) => {
    const created = await create(movie)
    handleClose()

    void navigate({
      pathname: `/${created.id.toString()}`,
    })
  }

  const form = useForm<MovieFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(movieSchema),
    defaultValues: {
      genres: [],
    },
  })

  return (
    <FormProvider {...form}>
      <AddMovie show onClose={handleClose} onSubmit={handleSubmit} />
    </FormProvider>
  )
}
