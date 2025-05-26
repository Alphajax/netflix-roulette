import styles from './styles.module.scss'
import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dialog } from '../../ui'
import { Link, useSearchParams } from 'react-router-dom'

interface MovieTitleProps {
  imgURL: string
  name: string
  year: string
  genres: string[]
  onClick?: MouseEventHandler
  id: string
}

export const MovieTitle = ({ id, imgURL, name, year, genres, onClick }: MovieTitleProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpenModal = () => {
    setIsOpened(true)
  }
  const handleCloseModal = () => {
    setIsOpened(false)
  }

  const [searchParams] = useSearchParams()

  return (
    <Link to={{ pathname: `/${id}`, search: `?${searchParams.toString()}` }}>
      <div className={styles.container} onClick={onClick}>
        <button className={styles.openIcon} onClick={handleOpenModal}>
          <MoreOutlined />
        </button>
        <div className={styles.posterContainer}>
          <img alt={name} className={styles.image} src={imgURL} />
        </div>
        <div className={styles.footer}>
          <div className={styles.firstLine}>
            <p className={styles.name}>{name}</p>
            <p className={styles.year}>{year}</p>
          </div>
          <div className={styles.secondLine}>
            <span>{genres.join(', ')}</span>
          </div>
        </div>
        <Dialog show={isOpened} title="" onClose={handleCloseModal}>
          <div className={styles.buttonsContainer}>
            <Button variant="primary">Edit</Button>
            <Button variant="cancel">Delete</Button>
          </div>
        </Dialog>
      </div>
    </Link>
  )
}
