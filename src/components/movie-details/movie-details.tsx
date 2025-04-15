import styles from './styles.module.scss'
import type { IMovie } from '../../types'

type MovieDetailsProps = IMovie

export const MovieDetails = ({
  imgURL,
  name,
  year,
  rating,
  duration,
  description,
  genres,
}: MovieDetailsProps) => (
  <div className={styles.container}>
    <div>
      <img alt="" className={styles.poster} src={imgURL} />
    </div>
    <div className={styles.right}>
      <p className={styles.name}>
        {name}
        <span className={styles.rating}>{rating}</span>
      </p>
      <p className={styles.genres}>{genres.join(', ')}</p>
      <div className={styles.yearAndDuration}>
        <p>{year}</p>
        <p>{duration}</p>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
)
