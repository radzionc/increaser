import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import {
  getGoalStatusFilterName,
  useGoalStatusFilter,
} from './useGoalStatusFilter'
import { goalStatuses } from '@increaser/entities/Goal'
import { HStack } from '@lib/ui/css/stack'
import { Circle } from '@lib/ui/layout/Circle'
import { getGoalStatusColor } from '../getGoalStatusColor'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'

export const GoalStatusFilter = () => {
  const [value, setValue] = useGoalStatusFilter()
  const theme = useTheme()

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      value={value}
      onChange={setValue}
      options={[...goalStatuses, null]}
      getOptionKey={getGoalStatusFilterName}
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <Circle
            size={8}
            background={
              option ? getGoalStatusColor(option, theme) : theme.colors.textShy
            }
          />
          <Text>{getGoalStatusFilterName(option)}</Text>
        </HStack>
      )}
    />
  )
}
