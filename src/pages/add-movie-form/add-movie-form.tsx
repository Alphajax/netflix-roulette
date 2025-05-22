import { AddMovie } from '../../components'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateMovie } from '../../hooks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Минимум 3 символа'),
  release_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Неверный формат даты (ожидается ISO 8601)',
  }),
  poster_path: z.string().url('Неверный формат ссылки'),
  vote_average: z.coerce
    .number()
    .gt(0, 'Оценка должна быть больше 0')
    .max(10, 'Оценка не должна превышать 10'),

  genres: z.array(z.string()),
  runtime: z.coerce.number().gt(0, 'Продолжительность должна быть больше 0'),
  overview: z.string().min(10, 'Описание не должно быть  меньше 10 символов'),
})

export type MovieFormData = z.infer<typeof schema>

export const AddMovieForm = () => {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    setShow(false)
    void navigate('/')
  }, [navigate])

  const { create } = useCreateMovie()

  const handleSubmit = useCallback(
    async (movie: MovieFormData) => {
      const created = await create(movie)
      handleClose()

      void navigate({
        pathname: `/${created.id.toString()}`,
      })
    },
    [create, handleClose, navigate],
  )

  const form = useForm<MovieFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      genres: [],
    },
  })

  return <AddMovie form={form} show={show} onClose={handleClose} onSubmit={handleSubmit} />
}
