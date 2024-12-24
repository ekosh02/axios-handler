import { AxiosError, AxiosResponse } from "axios";

export type FetchingParams<T, D, E> = {
  query: (arg?: any) => Promise<AxiosResponse<T, D>>;
  onComplete?: (response: AxiosResponse<T, D>) => void;
  onError?: (error: AxiosError<E>) => void;
  initialLoading?: boolean;
  initialRefreshing?: boolean;
};
