import styles from './styles.module.scss'
import { Button, Input, TextArea } from '../../ui'
import { GenreSelect } from '../genre-select'
import type { Movie } from '../../types'
import { genres } from '../../utils'

import type { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { MovieFormData } from '../../pages'

interface MovieFormProps {
  initialMovieInfo?: Movie
  onSubmit: (formData: MovieFormData) => void
  form: UseFormReturn<MovieFormData>
}

export const MovieForm = ({
  onSubmit,
  form: {
    handleSubmit,
    formState: { errors },
    register,
    control,
  },
}: MovieFormProps) => {
  const handleSubmitForm: SubmitHandler<MovieFormData> = (data) => {
    onSubmit(data)
  }

  return (
    <div className={styles.container}>
      <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.formInputs}>
          <Input error={errors.title} label="Title" placeholder="title" {...register('title')} />
          <Input
            error={errors.release_date}
            label="Select Date"
            placeholder="Select Date"
            {...register('release_date')}
          />
          <Input
            error={errors.poster_path}
            label="Movie Url"
            placeholder="https://"
            {...register('poster_path')}
          />
          <Input
            error={errors.vote_average}
            label="Rating"
            placeholder="7.8"
            {...register('vote_average')}
          />
          <Controller
            control={control}
            name="genres"
            render={({ field, fieldState }) => (
              <GenreSelect
                error={fieldState.error}
                options={genres}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Input
            error={errors.runtime}
            label="Runtime"
            placeholder="minutes"
            type="number"
            {...register('runtime')}
          />
          <TextArea
            containerClassName={styles.overview}
            error={errors.overview}
            label="Overview"
            placeholder="Movie description"
            {...register('overview')}
          />
          <Button className={styles.submit} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
