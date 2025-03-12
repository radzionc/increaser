import { HStack } from '@lib/ui/css/stack'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'

import { breakDurations } from './BreakDuration'
import { useDefaultBreakDuration } from './state/useDefaultBreakDuration'

export const DefaultBreakDurationPreference = () => {
  const [value, setValue] = useDefaultBreakDuration()

  return (
    <HStack alignItems="center" gap={8}>
      <Text color="supporting">Default break duration:</Text>
      <ExpandableSelector
        value={value}
        showToggle={false}
        onChange={setValue}
        options={breakDurations}
        getOptionKey={(duration) => duration.toString()}
        getOptionName={(duration) =>
          formatDuration(duration, 'min', { kind: 'l' })
        }
      />
    </HStack>
  )
}
