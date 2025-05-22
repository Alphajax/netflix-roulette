import { Dialog } from '../../ui'
import { MovieForm } from '../movie-form'
import type { MovieFormData } from '../../pages'
import type { UseFormReturn } from 'react-hook-form'

interface AddMovieProps {
  show: boolean
  onClose: () => void
  onSubmit: (movie: MovieFormData) => void
  form: UseFormReturn<MovieFormData>
}

export const AddMovie = ({ show, onClose, onSubmit, form }: AddMovieProps) => (
  <Dialog show={show} title="Add Movie" onClose={onClose}>
    <MovieForm form={form} onSubmit={onSubmit} />
  </Dialog>
)
