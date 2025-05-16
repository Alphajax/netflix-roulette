import styles from '../movie-list-page/styles.module.scss'
import { Search } from '../../ui'
import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useSearchParams()
  const handleSearch = useCallback(
    (query: string) => {
      searchQuery.set('query', query)
      setSearchQuery(searchQuery)
    },
    [searchQuery, setSearchQuery],
  )
  return (
    <>
      <h2 className={styles.contentHeader}>FIND YOUR MOViE</h2>
      <Search
        initialSearch={searchQuery.get('query') ?? ''}
        placeholder="What do you want to watch?"
        onSearch={handleSearch}
      />
    </>
  )
}
