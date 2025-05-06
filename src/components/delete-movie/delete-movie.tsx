import { Button, Dialog } from '../../ui'

import styles from './styles.module.scss'

interface DeleteMovieProps {
  show: boolean
  onClose: () => void
  onSubmit: () => void
}
export const DeleteMovie = ({ show, onClose, onSubmit }: DeleteMovieProps) => (
  <Dialog show={show} title="Delete Movie" onClose={onClose}>
    <div className={styles.content}>
      <p>Are you sure you want to delete this movie?</p>
      <div className={styles.buttonContainer}>
        <Button className={styles.confirm} onClick={onSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  </Dialog>
)
