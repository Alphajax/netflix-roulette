import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MovieDetailsContainer, SearchForm } from './components'
import { MovieListPage } from './pages'
import { getMovie, mapMovie } from './hooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieListPage />,
    children: [
      {
        path: '/',
        element: <SearchForm />,
      },
      {
        path: '/:movieId',
        element: <MovieDetailsContainer />,
        loader: async ({ params }: { params: { movieId?: string } }) => {
          if (!params.movieId) {
            throw new Error('No Movie Id')
          }
          return await getMovie(params.movieId).then(mapMovie)
        },
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
