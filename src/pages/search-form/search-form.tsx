import styles from './styles.module.scss'
import { Search } from '../../ui'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleSearch = useCallback(
    (query: string) => {
      setSearchParams((prev) => {
        prev.set('query', query)
        return prev
      })
    },
    [setSearchParams],
  )
  return (
    <>
      <h2 className={styles.contentHeader}>FIND YOUR MOViE</h2>
      <Search
        initialSearch={searchParams.get('query') ?? ''}
        placeholder="What do you want to watch?"
        onSearch={handleSearch}
      />
      <Outlet />
    </>
  )
}
