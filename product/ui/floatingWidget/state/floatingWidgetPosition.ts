import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

export const useFloatingWidgetPosition = () => {
  return usePersistentState<RectangleCorner>(
    PersistentStateKey.FloatingWidgetPosition,
    'bottom-right',
  )
}
