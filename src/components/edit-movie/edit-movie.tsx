import type { IMovie } from '../../types'
import { Dialog } from '../../ui'
import { MovieForm } from '../movie-form'

interface IEditMovieProps {
  show: boolean
  onClose: () => void
  onSubmit: (movie: IMovie) => void
  initialMovieInfo: IMovie
}

export const EditMovie = ({ show, onClose, onSubmit, initialMovieInfo }: IEditMovieProps) => (
  <Dialog show={show} title="Edit Movie" onClose={onClose}>
    <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
  </Dialog>
)
