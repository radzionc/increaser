import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { focusDurations } from '@increaser/entities/FocusDuration'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const IconContainer = styled(IconWrapper)`
  color: ${getColor('textShy')};
`

export const FocusGoal = () => {
  const { focusDuration, setFocusDuration } = useFocus()

  return (
    <ExpandableSelector
      openerContent={
        <HStack gap={8} alignItems="center">
          <IconContainer>
            <ClockIcon />
          </IconContainer>
          <Text>{focusDuration} min</Text>
        </HStack>
      }
      getOptionKey={(duration) => duration.toString()}
      renderOption={(duration) => `${duration} min`}
      onChange={setFocusDuration}
      value={focusDuration}
      options={focusDurations}
    />
  )
}
