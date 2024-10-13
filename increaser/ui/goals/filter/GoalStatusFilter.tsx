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
import { Filter } from '@lib/ui/data/filter/Filter'

export const GoalStatusFilter = () => {
  const [value, setValue] = useGoalStatusFilter()
  const theme = useTheme()

  return (
    <Filter
      value={value}
      onChange={setValue}
      items={goalStatuses}
      getItemKey={getGoalStatusFilterName}
      title="Filter by status"
      renderItem={(option) => (
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
