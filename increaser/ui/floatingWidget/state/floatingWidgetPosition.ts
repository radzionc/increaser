import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'

export const useFloatingWidgetPosition = () => {
  return usePersistentState<RectangleCorner>(
    PersistentStateKey.FloatingWidgetPosition,
    'bottom-right',
  )
}
