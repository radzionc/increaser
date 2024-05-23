import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { focusSounds } from './state/useFocusSoundsPreference'
import { FocusSoundOption } from './FocusSoundOption'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'

export const SoundsFocusWidget = () => {
  return (
    <ScrollableFlexboxFiller>
      <UniformColumnGrid gap={0} minChildrenWidth={100}>
        {focusSounds.map((sound) => (
          <FocusSoundOption key={sound} value={sound} />
        ))}
      </UniformColumnGrid>
    </ScrollableFlexboxFiller>
  )
}
