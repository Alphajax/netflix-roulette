import { AddMovie } from '../../components'
import type { Movie } from '../../types'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddMovieForm = () => {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    setShow(false)
    void navigate('/')
  }, [navigate])

  const handleSubmit = useCallback((movie: Movie) => {
    console.log('handleSubmit')
    console.log(movie)
  }, [])
  return <AddMovie show={show} onClose={handleClose} onSubmit={handleSubmit} />
}
