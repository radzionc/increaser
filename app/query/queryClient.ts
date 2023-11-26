import { QueryClient, QueryKey } from 'react-query'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { MS_IN_DAY } from '@increaser/utils/time'
import { hasWindow } from '@increaser/ui/utils/window'
import { PersistentStateKey } from 'state/persistentState'
import { paddleQueryKey } from '@increaser/paddle-classic-ui/hooks/usePaddleSdk'

const cacheTime = MS_IN_DAY * 5

export const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime,
      },
    },
  })

  const localStoragePersistor = createWebStoragePersistor({
    storage: (hasWindow ? window.localStorage : undefined)!,
    key: PersistentStateKey.ReactQueryState,
  })

  const doNotPersistQueries: QueryKey[] = [paddleQueryKey]

  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
    maxAge: cacheTime,
    hydrateOptions: {},
    dehydrateOptions: {
      shouldDehydrateQuery: ({ queryKey }) => {
        return !doNotPersistQueries.includes(queryKey)
      },
    },
  })

  return queryClient
}
