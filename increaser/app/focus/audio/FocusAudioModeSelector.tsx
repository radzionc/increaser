import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import {
  focusAduioModeName,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'
import { ShyOption } from '@lib/ui/buttons/ShyOption'

export const FocusAudioModeSelector = () => {
  const [mode, setMode] = useFocusAudioMode()

  return (
    <UniformColumnGrid gap={4}>
      {focusAudioModes.map((option) => (
        <ShyOption
          key={option}
          isSelected={mode === option}
          onClick={() => setMode(option)}
        >
          {focusAduioModeName[option]}
        </ShyOption>
      ))}
    </UniformColumnGrid>
  )
}
