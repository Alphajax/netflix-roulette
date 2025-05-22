import styles from './styles.module.scss'
import type { Movie } from '../../types'

type MovieDetailsProps = Movie

export const MovieDetails = ({
  poster_path,
  title,
  release_date,
  vote_average,
  runtime,
  overview,
  genres,
}: MovieDetailsProps) => (
  <div className={styles.container}>
    <div>
      <img alt="" className={styles.poster} src={poster_path} />
    </div>
    <div className={styles.right}>
      <p className={styles.name}>
        {title}
        <span className={styles.rating}>{vote_average}</span>
      </p>
      <p className={styles.genres}>{genres.join(', ')}</p>
      <div className={styles.yearAndDuration}>
        <p>{release_date}</p>
        <p>{runtime}</p>
      </div>
      <p className={styles.description}>{overview}</p>
    </div>
  </div>
)
