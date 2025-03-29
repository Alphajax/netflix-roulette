import styles from './styles.module.scss'
import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import { CloseOutlined, MoreOutlined } from '@ant-design/icons'
import { Button } from '../../ui'

interface Props {
  imgURL: string
  name: string
  year: number
  genres: string[]
  onClick: MouseEventHandler
}

export const MovieTitle = ({ imgURL, name, year, genres, onClick }: Props) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpenModal = () => {
    setIsOpened(true)
  }
  const handleCloseModal = () => {
    setIsOpened(false)
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <MoreOutlined className={styles.openIcon} data-testid="open-icon" onClick={handleOpenModal} />
      <img alt={name} className={styles.image} src={imgURL} />
      <div className={styles.footer}>
        <div className={styles.firstLine}>
          <p className={styles.name}>{name}</p>
          <p className={styles.year}>{year}</p>
        </div>
        <div className={styles.secondLine}>
          <span>{genres.join(', ')}</span>
        </div>
      </div>
      {isOpened && (
        <div className={styles.modal}>
          <CloseOutlined
            className={styles.closeIcon}
            data-testid="close-icon"
            onClick={handleCloseModal}
          />
          <div className={styles.buttonsContainer}>
            <Button variant="primary">Edit</Button>
            <Button variant="cancel">Delete</Button>
          </div>
        </div>
      )}
    </div>
  )
}
