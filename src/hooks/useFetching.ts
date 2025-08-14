import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FetchingParams, FetchingReturn, FetchState, RequestState } from './types'

export const useFetching = <T = any, D = any, E = any>({
  query,
  onComplete,
  onError,
  initialLoading = false,
  initialRefreshing = false,
  retryCount = 0,
  retryDelay = 1000,
}: FetchingParams<T, D, E>): FetchingReturn<T, D, E> => {
  if (!query) throw new Error('query function is required!')

  const [data, setData] = useState<AxiosResponse<T, D> | null>(null)
  const [error, setError] = useState<AxiosError<E> | null>(null)
  const [loading, setLoading] = useState(initialLoading)
  const [refreshing, setRefreshing] = useState(initialRefreshing)
  const [fetchState, setFetchState] = useState<FetchState>('initial')

  const reset = () => {
    setLoading(false)
    setRefreshing(false)
    onComplete?.(null)
    onError?.(null)
    setData(null)
    setError(null)
    setFetchState('initial')
  }

  const handleRequest = async (props?: any, requestState: RequestState = 'loading') => {
    if (requestState === 'loading') setLoading(true)
    if (requestState === 'refreshing') setRefreshing(true)
    setFetchState(requestState)
    setError(null)

    let attempt = 0

    while (attempt <= retryCount) {
      try {
        const response = await query(props)
        setFetchState('success')
        setData(response)
        onComplete?.(response)
        break
      } catch (error) {
        const axiosError = error as AxiosError<E>

        attempt++

        if (attempt > retryCount) {
          setFetchState('error')
          setError(axiosError)
          onError?.(axiosError)
          break
        }
        await new Promise((result) => setTimeout(result, retryDelay))
      }
    }

    if (requestState === 'loading') setLoading(false)
    if (requestState === 'refreshing') setRefreshing(false)
  }

  const refresh = (props?: any) => handleRequest(props, 'refreshing')

  const fetch = (props?: any) => handleRequest(props, 'loading')

  return { fetch, refresh, reset, data, loading, refreshing, error, fetchState }
}
