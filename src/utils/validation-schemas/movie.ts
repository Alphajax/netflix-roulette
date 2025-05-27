import { z } from 'zod'
export const genreEnum = z.enum([
  'Drama',
  'Romance',
  'Fantasy',
  'Adventure',
  'Science Fiction',
  'Action',
  'Comedy',
  'Family',
])

export const movieSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
  release_date: z.string().date('Неверынй формат даты'),
  poster_path: z.string().url('Неверный формат ссылки'),
  vote_average: z.coerce
    .number({ message: 'Оценка должна быть числом' })
    .gt(0, 'Оценка должна быть больше 0')
    .max(10, 'Оценка не должна превышать 10'),

  genres: z.array(genreEnum),
  runtime: z.coerce.number().gt(0, 'Продолжительность должна быть больше 0'),
  overview: z
    .string()
    .min(10, 'Описание не должно быть  меньше 10 символов')
    .max(5000, 'Описание не должно быть  меньше 5000 символов'),
})
