import styles from './styles.module.scss'

interface Props {
  imgURL: string
  name: string
  genres: string[]
  year: number
  rating: number
  duration: string
  description: string
}

export const MovieDetails = ({
  imgURL,
  name,
  year,
  rating,
  duration,
  description,
  genres,
}: Props) => (
  <div className={styles.container}>
    <div>
      <img alt={name} className={styles.poster} src={imgURL} />
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
