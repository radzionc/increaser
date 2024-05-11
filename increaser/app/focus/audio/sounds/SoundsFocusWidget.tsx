import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { focusSounds } from './state/useFocusSoundsPreference'
import { FocusSoundOption } from './FocusSoundOption'

export const SoundsFocusWidget = () => {
  return (
    <UniformColumnGrid gap={4} maxColumns={3}>
      {focusSounds.map((sound) => (
        <FocusSoundOption key={sound} value={sound} />
      ))}
    </UniformColumnGrid>
  )
}
