import styles from './styles.module.scss'
import { Button } from '../../ui'
import { SortControl } from '../sort-control'
import clsx from 'clsx'
import { MovieTitle } from '../movie-title'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useGetMovies } from '../../hooks'
import { useCallback } from 'react'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('query') ?? ''
  const sortCriteria = searchParams.get('sortBy') ?? 'release_date'
  const activeGenre = searchParams.get('genre') ?? tabs[0]

  const { data, isPending } = useGetMovies({
    activeGenre,
    sortBy: sortCriteria,
    search: searchQuery,
  })

  const handleSetSearchParam = useCallback(
    (name: string, value: string) => {
      searchParams.set(name, value)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams],
  )

  if (isPending) {
    return <h1>Loading</h1>
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.siteName}>
            <span className={styles.widePartOfName}>netflix</span>
            roulette
          </h1>
          <Button variant="secondary">+ Add Movie</Button>
        </div>
        <div className={styles.headerContent}>
          <Outlet />
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
                        handleSetSearchParam('genre', tab)
                      }}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <SortControl
              value={sortCriteria}
              onChange={(sortBy) => {
                handleSetSearchParam('sortBy', sortBy)
              }}
            />
          </nav>
        </div>
        <div className={styles.movieList}>
          {data?.map((movie) => (
            <MovieTitle
              genres={movie.genres}
              id={movie.id}
              imgURL={movie.imgURL}
              key={movie.id}
              name={movie.name}
              year={movie.year}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
