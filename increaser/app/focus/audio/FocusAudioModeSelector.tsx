import {
  focusAduioModeName,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'

import { HStack } from '@lib/ui/layout/Stack'
import { useIsFocusAudioEnabled } from './state/useIsFocusAudioEnabled'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { Switch } from '@lib/ui/inputs/Switch'

const headerHeight = 48

export const FocusAudioModeSelector = () => {
  const [isEnabled, setIsEnabled] = useIsFocusAudioEnabled()
  const [mode, setMode] = useFocusAudioMode()

  return (
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      gap={20}
    >
      <Switch
        label="Focus sounds"
        value={isEnabled}
        onChange={setIsEnabled}
        style={{
          minHeight: headerHeight,
        }}
      />
      {isEnabled && (
        <RadioInput
          minOptionHeight={headerHeight}
          value={mode}
          onChange={setMode}
          options={focusAudioModes}
          renderOption={(option) => focusAduioModeName[option]}
        />
      )}
    </HStack>
  )
}
