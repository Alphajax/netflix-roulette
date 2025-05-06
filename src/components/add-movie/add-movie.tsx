import { Dialog } from '../../ui'
import { MovieForm } from '../movie-form'
import type { Movie } from '../../types'

interface AddMovieProps {
  show: boolean
  onClose: () => void
  onSubmit: (movie: Movie) => void
}

export const AddMovie = ({ show, onClose, onSubmit }: AddMovieProps) => (
  <Dialog show={show} title="Add Movie" onClose={onClose}>
    <MovieForm onSubmit={onSubmit} />
  </Dialog>
)
