import { QueryClient, QueryKey } from '@tanstack/react-query'
import { hasWindow } from '@lib/ui/utils/window'
import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { paddleQueryKey } from '@increaser/paddle-classic-ui/hooks/usePaddleSdk'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

const maxAge = convertDuration(1, 'd', 'ms')

export const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: maxAge,
      },
    },
  })

  const localStoragePersistor = createSyncStoragePersister({
    storage: hasWindow ? window.localStorage : undefined,
    key: PersistentStateKey.ReactQueryState,
  })

  const doNotPersistQueries: QueryKey[] = [paddleQueryKey]

  persistQueryClient({
    queryClient,
    persister: localStoragePersistor,
    maxAge,
    hydrateOptions: {},
    dehydrateOptions: {
      shouldDehydrateQuery: ({ queryKey }) => {
        return !doNotPersistQueries.includes(queryKey)
      },
    },
  })

  return queryClient
}
