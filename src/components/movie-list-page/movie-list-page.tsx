import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button, Search } from '../../ui'
import { SortControl } from '../sort-control'
import clsx from 'clsx'
import { MovieTitle } from '../movie-title'
import type { IMovie } from '../../types'
import { movies } from './mock.ts'
import { MovieDetails } from '../movie-details'

const tabs = ['все', 'криминал', 'документальный', 'ужасы', 'комедия']
export const MovieListPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortCriteria, setSortCriteria] = useState('RELEASE DATE')
  const [activeGenre, setActiveGenre] = useState(() => tabs[0])
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    setMovieList(movies)
  }, [])

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
          {selectedMovie ? (
            <MovieDetails {...selectedMovie} />
          ) : (
            <>
              <h2 className={styles.contentHeader}>FIND YOUR MOViE</h2>
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
              <ul className={styles.tabsItems}>
                {tabs.map((tab) => (
                  <li
                    className={clsx({ [styles.active]: tab === activeGenre })}
                    value={tab}
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
              imgURL={movie.imgURL}
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
