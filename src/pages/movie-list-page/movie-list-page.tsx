import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button, Search } from '../../ui'
import { MovieDetails, MovieTitle, SortControl } from '../../components'
import clsx from 'clsx'
import type { Movie } from '../../types'
import { useRequest } from '../../hooks/use-request.ts'
import type { ApiResponse } from './utils.ts'
import { mapMovies } from './utils.ts'

const tabs = [
  'Drama',
  'Romance',
  'Fantasy',
  'Adventure',
  'Science Fiction',
  'Action',
  'Comedy',
  'Family',
]
export const MovieListPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortCriteria, setSortCriteria] = useState('release_date')
  const [activeGenre, setActiveGenre] = useState(tabs[0])
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { run } = useRequest<ApiResponse>({
    method: 'GET',
    url: 'http://localhost:4000/movies',
    onSuccess: (data) => {
      setMovieList(mapMovies(data))
    },
    params: {
      search: searchQuery,
      searchBy: 'title',
      sortBy: sortCriteria,
      sortOrder: 'asc',
      filter: [activeGenre],
    },
  })

  useEffect(() => {
    void run()
  }, [searchQuery, sortCriteria, activeGenre])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.backgroundImage} />
        <div className={styles.headerTop}>
          <h1 className={styles.siteName}>
            <span className={styles.widePartOfName}>netflix</span>roulette
          </h1>
          <Button variant="secondary">+ Add Movie</Button>
        </div>
        <div className={styles.headerContent}>
          {selectedMovie ? (
            <MovieDetails {...selectedMovie} />
          ) : (
            <>
              <h2 className={styles.contentHeader}>Find your movie</h2>
              <Search
                initialSearch={searchQuery}
                placeholder="What do you want to watch?"
                onSearch={setSearchQuery}
              />
            </>
          )}
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.navContentContainer}>
          <nav className={styles.tabs}>
            <div className={styles.tabsContainer}>
              <ul className={styles.tabsItems} role="tablist">
                {tabs.map((tab) => (
                  <li
                    className={clsx({ [styles.active]: tab === activeGenre })}
                    key={tab}
                    role="tab"
                    value={tab}
                  >
                    <button
                      tabIndex={0}
                      onClick={() => {
                        setActiveGenre(tab)
                      }}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <SortControl value={sortCriteria} onChange={setSortCriteria} />
          </nav>
        </div>
        <div className={styles.movieList}>
          {movieList.map((movie) => (
            <MovieTitle
              genres={movie.genres}
              imgURL={movie.imgURL}
              key={movie.id}
              name={movie.name}
              year={movie.year}
              onClick={() => {
                setSelectedMovie(movie)
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
