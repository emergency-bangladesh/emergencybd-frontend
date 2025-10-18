// Thanks to Cosden for showing us the exceptional way of state management!
// source : https://youtu.be/LMqGbLt0FPE?si=0Hr2gh4DBrznyMSC

import { useQuery, useQueryClient } from "@tanstack/react-query";

type Options<TState, TData = TState, TArgs extends Array<unknown> = []> =
  | { key: Array<unknown>; initialData?: TData }
  | { key: Array<unknown>; resolver: (...args: TArgs) => Promise<TData> };

export function createState<T>(options: Options<T>) {
  return function () {
    const queryClient = useQueryClient();
    const queryKey = options.key;
    const queryFn =
      "resolver" in options
        ? options.resolver
        : () => Promise.resolve(options.initialData || null);

    const { data, isLoading } = useQuery({
      queryKey,
      queryFn,
      staleTime: Infinity,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    });
    const set = (value: Partial<T> | null) =>
      queryClient.setQueryData(queryKey, value);
    const reset = () => queryClient.resetQueries({ queryKey });

    return { data, isLoading, set, reset };
  };
}
