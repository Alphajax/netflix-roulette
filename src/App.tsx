import { useCallback, useState } from 'react'

import { Counter, GenreSelect } from './components'
import { Search } from './ui'
import { genreSelectOptions } from './components/genre-select/constants.ts'

type SelectedGenre = typeof genreSelectOptions

function App() {
  const [selectedGenres, setSelectedGenres] = useState<SelectedGenre>(genreSelectOptions)

  const handleSearch = useCallback((search: string) => {
    alert('search by value:' + search)
  }, [])

  const handleSelectChange = (selected: string[]) => {
    setSelectedGenres(selected)
    alert('selected:' + selected.join(','))
  }

  return (
    <>
      <Counter initialValue={7} />
      <Search initialSearch="netflix" onSearch={handleSearch} />
      <GenreSelect
        options={genreSelectOptions}
        selected={selectedGenres}
        onSelect={handleSelectChange}
      />
    </>
  )
}

export default App
