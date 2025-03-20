import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import { useState } from 'react'

import styles from './search.module.scss'
import { Button } from '../button'
import { KEY_CODE } from '../../constants'

interface Props {
  initialSearch: string
  onSearch: (search: string) => void
}

export const Search = ({ initialSearch, onSearch }: Props) => {
  const [search, setSearch] = useState(initialSearch)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSearch(search)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_CODE.ENTER) {
      e.preventDefault()
      onSearch(search)
    }
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.searchInput}
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  )
}
