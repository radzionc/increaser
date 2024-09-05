import {
  GoalStatus,
  goalStatusNameRecord,
  goalStatuses,
} from '@increaser/entities/Goal'
import { Circle } from '@lib/ui/layout/Circle'
import { HStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { useTheme } from 'styled-components'
import { getGoalStatusColor } from '../getGoalStatusColor'

export const GoalStatusSelector = ({
  value,
  onChange,
}: InputProps<GoalStatus>) => {
  const theme = useTheme()

  return (
    <ExpandableSelector
      value={value}
      onChange={onChange}
      options={goalStatuses}
      getOptionKey={(option) => option}
      getOptionName={(option) => goalStatusNameRecord[option]}
      style={{ minWidth: 140 }}
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
