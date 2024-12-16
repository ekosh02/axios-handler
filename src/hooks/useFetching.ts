import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { FetchingParams } from "./types";

export const useFetching = <T = any, D = any, E = any>({
  query,
  onComplete,
  onError,
  initialLoading = false,
}: FetchingParams<T, D, E>) => {
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
