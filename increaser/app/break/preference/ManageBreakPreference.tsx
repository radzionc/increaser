import { Switch } from '@lib/ui/inputs/Switch'
import { useAutoBreakDuration } from '../state/autoBreakDuration'
import { breakDurations } from '../types/BreakDuration'
import { WithHint } from '@lib/ui/tooltips/WithHint'
import { HStack } from '@lib/ui/css/stack'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { Text } from '@lib/ui/text'

const info = `When enabled, breaks will start automatically after each work session, based on the duration you select. Automatic breaks won't start if the total work time exceeds 90 minutes, aligning with the recommended 90-minute productivity blocks for optimal focus and efficiency.`

export const ManageBreakPreference = () => {
  const [value, setValue] = useAutoBreakDuration()

  return (
    <HStack alignItems="center" gap={8} justifyContent="space-between">
      <Switch
        label={<WithHint hint={info}>Enable automatic breaks</WithHint>}
        size="s"
        value={!!value}
        onChange={(value) => setValue(value ? breakDurations[0] : null)}
      />
      {value && (
        <HStack alignItems="center" gap={8}>
          <Text color="supporting">Break duration:</Text>
          <ExpandableSelector
            value={value}
            showToggle={false}
            onChange={setValue}
            options={breakDurations}
            getOptionKey={(duration) => duration.toString()}
            getOptionName={(duration) =>
              formatDuration(duration, 'min', { kind: 'long' })
            }
          />
        </HStack>
      )}
    </HStack>
  )
}
