import { HStack } from '@lib/ui/css/stack'
import { Circle } from '@lib/ui/layout/Circle'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import {
  GoalStatus,
  goalStatusNameRecord,
  goalStatuses,
} from '@product/entities/Goal'
import { useTheme } from 'styled-components'

import { getGoalStatusColor } from '../getGoalStatusColor'

export const GoalStatusSelector = ({
  value,
  onChange,
}: InputProps<GoalStatus>) => {
  const theme = useTheme()

  return (
    <ExpandableSelector
      showToggle={false}
      value={value}
      onChange={onChange}
      options={goalStatuses}
      getOptionKey={(option) => option}
      getOptionName={(option) => goalStatusNameRecord[option]}
      returnFocus
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <Circle size={8} background={getGoalStatusColor(option, theme)} />
          <Text>{goalStatusNameRecord[option]}</Text>
        </HStack>
      )}
    />
  )
}
