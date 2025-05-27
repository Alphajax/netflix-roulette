import { Dialog } from '../../ui'
import { MovieForm } from '../movie-form'
import type { MovieFormData } from '../../pages'

interface AddMovieProps {
  show: boolean
  onClose: () => void
  onSubmit: (movie: MovieFormData) => void
}

export const AddMovie = ({ show, onClose, onSubmit }: AddMovieProps) => (
  <Dialog show={show} title="Add Movie" onClose={onClose}>
    <MovieForm onSubmit={onSubmit} />
  </Dialog>
)
