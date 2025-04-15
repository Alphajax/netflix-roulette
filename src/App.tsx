import { useCallback, useState } from 'react'

import { Counter, GenreSelect } from './components'
import { Search } from './ui'
import { genreSelectOptions } from './components/genre-select/constants.ts'

type SelectedGenre = typeof genreSelectOptions

function App() {
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>(() => genreSelectOptions)

  const handleSearch = useCallback((search: string) => {
    alert('search by value:' + search)
  }, [])

  const handleSelectChange = (selected: string[]) => {
    setSelectedGenre(selected)
    alert('selected:' + selected.join(','))
  }

  return (
    <>
      <Counter initialValue={7} />
      <Search initialSearch="netflix" onSearch={handleSearch} />
      <GenreSelect
        name="Select Genre"
        options={genreSelectOptions}
        selected={selectedGenre}
        onSelect={handleSelectChange}
      />
    </>
  )
}

export default App
