import type { FormEventHandler } from 'react'
import { useRef } from 'react'

import styles from './search.module.scss'
import { Button } from '../button'
import { Input } from '../input'

interface SearchProps {
  label?: string
  initialSearch: string
  onSearch: (search: string) => void
}

export const Search = ({ label, initialSearch, onSearch }: SearchProps) => {
  const input = useRef<HTMLInputElement>(null)

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSearch(input.current?.value ?? '')
  }

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmitForm}>
        <Input defaultValue={initialSearch} label={label} ref={input} />
        <div className={styles.buttonContainer}>
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>
  )
}
