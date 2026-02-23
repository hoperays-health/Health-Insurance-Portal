import { QueryClient, DefaultOptions } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {
    // Default options for all queries
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes (previously cacheTime)
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    // Default options for all mutations
    retry: 0,
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})
