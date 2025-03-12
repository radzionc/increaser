import { HStack } from '@lib/ui/css/stack'
import { Circle } from '@lib/ui/layout/Circle'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { projectStatuses } from '@product/entities/Project'
import { useTheme } from 'styled-components'

import { getProjectStatusColor } from '../../utils/getProjectStatusColor'

import { useProjectStatusFilter } from './ProjectStatusFilterProvider'

export const ProjectStatusFilter = () => {
  const [value, setValue] = useProjectStatusFilter()
  const theme = useTheme()

  return (
    <ExpandableSelector
      value={value}
      onChange={setValue}
      options={projectStatuses}
      getOptionKey={(option) => capitalizeFirstLetter(option)}
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <Circle size={8} background={getProjectStatusColor(option, theme)} />
          <Text>{capitalizeFirstLetter(option)}</Text>
        </HStack>
      )}
    />
  )
}
