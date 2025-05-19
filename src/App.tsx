import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AddMovieForm, MovieDetailsCard, MovieListPage, SearchForm } from './pages'
import { getMovieLoader } from './hooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieListPage />,
    children: [
      {
        path: '/',
        element: <SearchForm />,
        children: [{ path: '/new', element: <AddMovieForm /> }],
      },
      {
        path: '/:movieId',
        element: <MovieDetailsCard />,
        loader: getMovieLoader,
      },
    ],
  },
])

const queryClient = new QueryClient()

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
