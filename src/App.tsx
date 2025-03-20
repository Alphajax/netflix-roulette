import { useCallback, useState } from 'react'

import { Counter, GenreSelect } from './components'
import { Search } from './ui'

import { genreSelectOptions } from './components/genre-select/constants.ts'

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>(genreSelectOptions[0])

  const onSearch = useCallback((search: string) => {
    alert('search by value:' + search)
  }, [])

  const handleSelectChange = (selected: string) => {
    setSelectedGenre(selected)
    alert('selected:' + selected)
  }

  return (
    <>
      <Counter initialValue={7} />
      <Search initialSearch={'netflix'} onSearch={onSearch} />
      <GenreSelect
        options={genreSelectOptions}
        onSelect={handleSelectChange}
        selected={selectedGenre}
      />
    </>
  )
}

export default App
