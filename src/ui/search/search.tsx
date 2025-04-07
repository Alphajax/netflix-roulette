import type { FormEventHandler } from 'react'
import { useRef } from 'react'

import styles from './search.module.scss'
import { Button } from '../button'

interface SearchProps {
  initialSearch: string
  onSearch: (search: string) => void
}

export const Search = ({ initialSearch, onSearch }: SearchProps) => {
  const input = useRef<HTMLInputElement>(null)

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSearch(input.current?.value ?? '')
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <input
          className={styles.searchInput}
          defaultValue={initialSearch}
          ref={input}
          type="text"
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}
