import { AppPageViews, AppPageWithView } from '@increaser/ui/navigation/app'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

type LastPageView = Partial<{
  [K in AppPageWithView]: AppPageViews[K][number]
}>

export const useLastPageView = () => {
  return usePersistentState<LastPageView>(PersistentStateKey.LastPageView, {})
}
