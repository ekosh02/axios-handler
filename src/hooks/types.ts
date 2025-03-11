import { AxiosError, AxiosResponse } from 'axios'

/**
 * Type for the state of the request, indicating whether it is in a loading or refreshing state.
 */
export type RequestState = 'loading' | 'refreshing'

/**
 * Parameters for configuring the `useFetching` hook.
 *
 * @template T - Type of the expected response data.
 * @template D - Type of the request data sent in the config (optional).
 * @template E - Type of the error response data.
 */
export type FetchingParams<T, D, E> = {
  /**
   * Function to perform the HTTP request using Axios.
   *
   * @param {any} [props] - Parameters to configure the HTTP request.
   * @example
   * query: async (props) => {
   *   const { id, filters } = props;
   *   return await axios.get(`api/v2/example/${id}`, { params: filters });
   * };
   */
  query: (props?: any) => Promise<AxiosResponse<T, D>>

  /**
   * Callback on successful request completion.
   */
  onComplete?: (response: AxiosResponse<T, D>) => void

  /**
   * Callback on request failure.
   */
  onError?: (error: AxiosError<E>) => void

  /**
   * Whether the request starts in a loading state.
   * @default false
   */
  initialLoading?: boolean

  /**
   * Whether the request starts in a refreshing state.
   * @default false
   */
  initialRefreshing?: boolean
}

/**
 * Return type of the `useFetching` hook.
 *
 * @template T - Type of the expected response data.
 * @template D - Type of the request data sent in the config (optional).
 * @template E - Type of the error response data.
 */
export type FetchingReturn<T, D, E> = {
  /**
   * Starts the HTTP request.
   *
   * @param {any} [props] - Parameters for the request.
   *
   * @example
   * fetch({ id: 123, filters: { test: "test" } });
   */
  fetch: (props?: any) => Promise<void>

  /**
   * Re-triggers the request in a refreshing state.
   *
   * @param {any} [props] - Parameters for the request.
   *
   * @example
   * refresh({ id: 123, filters: { test: "test" } });
   */
  refresh: (props?: any) => Promise<void>

  /**
   * The response data or `null` if no request has been made.
   */
  data: AxiosResponse<T, D> | null

  /**
   * Whether the request is loading.
   */
  loading: boolean

  /**
   * Whether the request is refreshing.
   */
  refreshing: boolean

  /**
   * The error object if the request fails.
   */
  error: AxiosError<E> | null

  /**
   * Resets the state to its initial values.
   * @example
   * reset();
   */
  reset: () => void
}
