import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '../../ui'
import { SortControl } from '../sort-control'
import clsx from 'clsx'
import { MovieTitle } from '../movie-title'
import type { IMovie } from '../../types'
import { useRequest } from '../../hooks/use-request.ts'
import type { ApiResponse } from './utils.ts'
import { mapMovies } from './utils.ts'
import { Outlet, useSearchParams } from 'react-router-dom'

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
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const initialQuery = searchParams.get('query') ?? ''
  const initialSort = searchParams.get('sortBy') ?? 'release_date'
  const initialGenre = searchParams.get('genre') ?? tabs[0]
  const [searchQuery] = useState(initialQuery)
  const [sortCriteria, setSortCriteria] = useState(initialSort)
  const [activeGenre, setActiveGenre] = useState(initialGenre)

  const { run } = useRequest<ApiResponse>({
    method: 'GET',
    url: 'http://localhost:4000/movies',
    onSuccess: (data) => {
      setMovieList(mapMovies(data))
    },
    params: {
      search: searchParams.get('query'),
      searchBy: 'title',
      sortBy: searchParams.get('sortBy'),
      sortOrder: 'asc',
      filter: searchParams.get('genre'),
    },
  })

  useEffect(() => {
    setMovieList(movies)
  }, [])
    void run()
  }, [searchParams])

  useEffect(() => {
    setSearchParams({
      query: searchQuery,
      sortBy: sortCriteria,
      sortOrder: 'asc',
      genre: activeGenre,
    })
    void run()
  }, [searchQuery, sortCriteria, activeGenre])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          alt="background image"
          className={styles.backgroundImage}
          src="../../../public/background.png"
        />
        <div className={styles.headerTop}>
          <h1 className={styles.siteName}>
            <span className={styles.widePartOfName}>netflix</span>roulette
          </h1>
          <Button variant="add">+ Add Movie</Button>
        </div>
        <div className={styles.headerContent}>
          <Outlet />
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.navContentContainer}>
          <nav className={styles.tabs}>
            <div className={styles.tabsContainer}>
              <ul className={styles.tabsItems}>
                {tabs.map((tab) => (
                  <li
                    value={tab}
                    className={clsx({
                      [styles.active]: tab.toLowerCase() === activeGenre.toLowerCase(),
                    })}
                    onClick={() => {
                      setActiveGenre(tab)
                    }}
                  >
                    {tab}
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
              id={movie.id}
              imgURL={movie.imgURL}
              name={movie.name}
              year={movie.year}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
