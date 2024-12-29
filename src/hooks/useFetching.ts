import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FetchingParams, FetchingReturn, RequestState } from './types'

export const useFetching = <T = any, D = any, E = any>({
  query,
  onComplete,
  onError,
  initialLoading = false,
  initialRefreshing = false,
}: FetchingParams<T, D, E>): FetchingReturn<T, D, E> => {
  if (!query) throw new Error('query function is required!')

  const [data, setData] = useState<AxiosResponse<T, D> | null>(null)
  const [error, setError] = useState<AxiosError<E> | null>(null)
  const [loading, setLoading] = useState(initialLoading)
  const [refreshing, setRefreshing] = useState(initialRefreshing)

  const reset = () => {
    setData(null)
    setError(null)
    setLoading(false)
    setRefreshing(false)
  }

  const handleRequest = async (props?: any, requestState: RequestState = 'loading') => {
    if (requestState === 'loading') setLoading(true)
    if (requestState === 'refreshing') setRefreshing(true)
    setError(null)
    try {
      const response = await query(props)
      setData(response)
      onComplete?.(response)
    } catch (error) {
      const axiosError = error as AxiosError<E>
      setError(axiosError)
      onError?.(axiosError)
    } finally {
      if (requestState === 'loading') setLoading(false)
      if (requestState === 'refreshing') setRefreshing(false)
    }
  }

  const refresh = (props?: any) => handleRequest(props, 'refreshing')

  const fetch = (props?: any) => handleRequest(props, 'loading')

  return { fetch, refresh, reset, data, loading, refreshing, error }
}
