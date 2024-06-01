import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { FocusSoundOption } from './FocusSoundOption'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { focusSounds } from '../focusSounds'

export const SoundsFocusWidget = () => {
  return (
    <ScrollableFlexboxFiller style={{ minHeight: 400 }}>
      <UniformColumnGrid gap={0} minChildrenWidth={100}>
        {focusSounds.map((sound) => (
          <FocusSoundOption key={sound} value={sound} />
        ))}
      </UniformColumnGrid>
    </ScrollableFlexboxFiller>
  )
}
