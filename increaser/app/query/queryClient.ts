import { QueryClient } from '@tanstack/react-query'
import { hasWindow } from '@lib/ui/utils/window'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { PersistentStateKey } from '../state/persistentState'

const maxAge = convertDuration(1, 'd', 'ms')

interface Meta extends Record<string, unknown> {
  disablePersist?: boolean
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: Meta
    mutationMeta: Meta
  }
}

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

  persistQueryClient({
    queryClient,
    persister: localStoragePersistor,
    maxAge,
    hydrateOptions: {},
    dehydrateOptions: {
      shouldDehydrateQuery: ({ meta }) => {
        return !meta?.disablePersist
      },
    },
  })

  return queryClient
}
