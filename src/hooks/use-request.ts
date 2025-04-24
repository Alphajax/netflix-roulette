import { useCallback, useEffect, useRef, useState } from 'react'
import type { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios'
import axios from 'axios'

interface UseRequestConfig<TResponse, TError = unknown> extends AxiosRequestConfig {
  onSuccess?: (data: TResponse) => void
  onError?: (error: AxiosError<TError>) => void
}

interface UseRequestResult<TResponse, TError = unknown> {
  data: TResponse | null
  loading: boolean
  error: AxiosError<TError> | null
  run: (configOverride?: AxiosRequestConfig) => Promise<TResponse | undefined>
  cancel: () => void
}

export function useRequest<TResponse = unknown, TError = unknown>(
  config: UseRequestConfig<TResponse, TError>,
): UseRequestResult<TResponse, TError> {
  const { onSuccess, onError, ...axiosConfig } = config

  const [data, setData] = useState<TResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError<TError> | null>(null)
  const cancelSourceRef = useRef<CancelTokenSource | null>(null)

  const cancel = useCallback(() => {
    cancelSourceRef.current?.cancel('Request canceled')
  }, [])

  const run = useCallback(
    async (configOverride?: AxiosRequestConfig): Promise<TResponse | undefined> => {
      cancel()

      const source = axios.CancelToken.source()
      cancelSourceRef.current = source

      setLoading(true)
      setError(null)

      try {
        const response = await axios<TResponse>({
          ...axiosConfig,
          ...configOverride,
          cancelToken: source.token,
        })

        setData(response.data)
        onSuccess?.(response.data)
        return response.data
      } catch (err) {
        if (axios.isCancel(err)) return
        const typedError = err as AxiosError<TError>
        setError(typedError)
        onError?.(typedError)
      } finally {
        setLoading(false)
      }
    },
    [axiosConfig, cancel, onSuccess, onError],
  )

  useEffect(() => {
    void run()

    return () => {
      cancel()
    }
  }, [])

  return {
    data,
    loading,
    error,
    run,
    cancel,
  }
}
