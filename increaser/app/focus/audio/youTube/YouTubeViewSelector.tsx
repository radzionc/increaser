import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'

const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

export const YouTubeViewSelector = () => {
  const [soundsView, setSoundsView] = usePersistentState<SoundsView>(
    PersistentStateKey.FocusSoundsView,
    'all',
  )

  return (
    <MinimalisticToggle
      value={soundsView === 'favourites'}
      onChange={(value) => setSoundsView(value ? 'favourites' : 'all')}
      label="Only favourites"
    />
  )
}
