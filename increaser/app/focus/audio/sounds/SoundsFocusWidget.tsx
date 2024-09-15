import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { FocusSoundOption } from './FocusSoundOption'
import { focusSounds } from '../focusSounds'

export const SoundsFocusWidget = () => {
  return (
    <UniformColumnGrid gap={0} minChildrenWidth={100}>
      {focusSounds.map((sound) => (
        <FocusSoundOption key={sound} value={sound} />
      ))}
    </UniformColumnGrid>
  )
}
