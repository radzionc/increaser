import { HStack } from '@lib/ui/css/stack'
import { Filter } from '@lib/ui/data/filter/Filter'
import { Circle } from '@lib/ui/layout/Circle'
import { Text } from '@lib/ui/text'
import { goalStatuses } from '@product/entities/Goal'
import { useTheme } from 'styled-components'

import { getGoalStatusColor } from '../getGoalStatusColor'

import {
  getGoalStatusFilterName,
  useGoalStatusFilter,
} from './useGoalStatusFilter'

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
