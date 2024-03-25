import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

type useFetchingTypes<T, D> = {
  query?: (arg: any) => Promise<AxiosResponse<T, D>>;
  onComplete?: (response: AxiosResponse<T, D>) => undefined;
  onError?: (error: AxiosError<any>) => undefined;
  initialLoading?: boolean;
};

export const useFetching = <T = any, D = any>({
  query,
  onComplete,
  onError,
  initialLoading = false,
}: useFetchingTypes<T, D>) => {
  const [data, setData] = useState<AxiosResponse<T, D> | null>(null);
  const [error, setError] = useState<AxiosError<any> | null>(null);
  const [loading, setLoading] = useState(initialLoading);

  const fetch = async (props: any = null) => {
    try {
      setLoading(true);
      if (!query) return;
      const response = await query(props);
      setData(response);
      onComplete && onComplete(response);
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      setError(axiosError);
      onError && onError(axiosError);
    } finally {
      setLoading(false);
    }
  };

  return { fetch, data, loading, error };
};