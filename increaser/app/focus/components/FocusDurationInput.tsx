import {
  FocusDuration,
  focusDurations,
} from '@increaser/entities/FocusDuration'
import { InputProps } from '@lib/ui/props'
import { HStack } from '@lib/ui/layout/Stack'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

export const FocusDurationInput = ({
  value,
  onChange,
}: InputProps<FocusDuration>) => {
  return (
    <HStack alignItems="center" gap={12}>
      <LabelText>Focus duration</LabelText>

      <ExpandableSelector
        style={{ minWidth: 120 }}
        getOptionKey={(duration) => `${duration} min`}
        onChange={onChange}
        value={value}
        options={focusDurations}
      />
    </HStack>
  )
}
