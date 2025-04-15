import { Dialog } from '../../ui'
import { MovieForm } from '../movie-form'
import type { IMovie } from '../../types'

interface IAddMovieProps {
  show: boolean
  onClose: () => void
  onSubmit: (movie: IMovie) => void
}

export const AddMovie = ({ show, onClose, onSubmit }: IAddMovieProps) => (
  <Dialog show={show} title="Add Movie" onClose={onClose}>
    <MovieForm onSubmit={onSubmit} />
  </Dialog>
)
