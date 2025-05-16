import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MovieDetailsContainer, MovieListPage, SearchForm } from './components'

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
