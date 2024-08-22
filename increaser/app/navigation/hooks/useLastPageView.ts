import {
  appPageViews,
  AppPageViews,
  AppPageWithView,
} from '@increaser/ui/navigation/app'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { Entry } from '@lib/utils/entities/Entry'
import { omit } from '@lib/utils/record/omit'
import { toEntries } from '@lib/utils/record/toEntries'

type LastPageView = Partial<{
  [K in AppPageWithView]: AppPageViews[K][number]
}>

function isInvalidPageView<K extends AppPageWithView>({
  key,
  value,
}: Entry<K, AppPageViews[K][number]>): boolean {
  if (!(key in appPageViews)) return true

  const views = appPageViews[key as AppPageWithView] as readonly string[]
  if (!views.includes(value)) return true

  return false
}

export const useLastPageView = () => {
  return useStateCorrector(
    usePersistentState<LastPageView>(PersistentStateKey.LastPageView, {}),
    (state) => {
      let result = state

      toEntries(state).forEach((entry) => {
        if (isInvalidPageView(entry)) {
          result = omit(result, entry.key as AppPageWithView)
        }
      })

      return result
    },
  )
}
