import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { FetchingParams } from "./types";

/**
 * useFetching - Custom React hook for Axios HTTP requests.
 *
 * @param {Function} query - Function to perform an HTTP request using Axios.
 * @param {Function} [onComplete] - Callback triggered on successful completion.
 * @param {Function} [onError] - Callback triggered when an error occurs.
 * @param {boolean} [initialLoading=false] - Initial loading state.
 *
 * @template T - Response data type.
 * @template D - Request payload type.
 * @template E - Error response type.
 *
 * @returns {Function} fetch - Function to trigger the HTTP request.
 * @returns {AxiosResponse<T, D> | null} data - Server response.
 * @returns {AxiosError<E> | null} error - Error object if the request fails.
 * @returns {boolean} loading - Indicates if the request is in progress.
 **/

export const useFetching = <T = any, D = any, E = any>({
  query,
  onComplete,
  onError,
  initialLoading = false,
}: FetchingParams<T, D, E>) => {
  if (!query) throw new Error("query function is required!");

  const [data, setData] = useState<AxiosResponse<T, D> | null>(null);
  const [error, setError] = useState<AxiosError<E> | null>(null);
  const [loading, setLoading] = useState(initialLoading);

  const fetch = async (props?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await query(props);
      setData(response);
      onComplete?.(response);
    } catch (error) {
      const axiosError = error as AxiosError<E>;
      setError(axiosError);
      onError?.(axiosError);
    } finally {
      setLoading(false);
    }
  };

  return { fetch, data, loading, error };
};
