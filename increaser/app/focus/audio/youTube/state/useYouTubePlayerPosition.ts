import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'

export const useYouTubePlayerPosition = () => {
  return usePersistentState<RectangleCorner>(
    PersistentStateKey.YouTubePlayerPosition,
    'bottom-right',
  )
}
