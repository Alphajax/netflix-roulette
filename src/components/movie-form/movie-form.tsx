import styles from './styles.module.scss'
import type { FormEventHandler } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { Button, Input, TextArea } from '../../ui'
import { GenreSelect } from '../genre-select'
import type { Movie } from '../../types'
import { convertFormDataToMovie } from './utils.ts'
import { genres } from '../../utils'

interface MovieFormProps {
  initialMovieInfo?: Movie
  onSubmit: (formData: Movie) => void
}

export const MovieForm = ({ initialMovieInfo, onSubmit }: MovieFormProps) => {
  const [selectedGenres, setSelectedGenres] = useState(initialMovieInfo?.genres ?? [])

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('genres', selectedGenres.join(','))
    const movie = Object.fromEntries(formData) as Record<string, string | undefined>
    onSubmit(convertFormDataToMovie(movie, initialMovieInfo?.id))
  }
  const handleSelectGenres = useCallback((genres: string[]) => {
    setSelectedGenres(genres)
  }, [])

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <div className={styles.formInputs}>
          <Input
            defaultValue={initialMovieInfo?.name}
            label="Title"
            name="name"
            placeholder="title"
          />
          <Input
            defaultValue={initialMovieInfo?.year}
            label="Select Date"
            name="year"
            placeholder="Select Date"
          />
          <Input
            defaultValue={initialMovieInfo?.imgURL}
            label="Movie Url"
            name="imgURL"
            placeholder="https://"
          />
          <Input
            defaultValue={initialMovieInfo?.rating}
            label="Rating"
            name="rating"
            placeholder="7.8"
          />
          <GenreSelect options={genres} selected={selectedGenres} onSelect={handleSelectGenres} />
          <Input
            defaultValue={initialMovieInfo?.duration}
            label="Runtime"
            name="duration"
            placeholder="minutes"
          />
          <TextArea
            containerClassName={styles.overview}
            defaultValue={initialMovieInfo?.description}
            label="Overview"
            name="description"
            placeholder="Movie description"
          />
          <Button className={styles.submit} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
