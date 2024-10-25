import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

import { HStack } from '@lib/ui/css/stack'
import { Circle } from '@lib/ui/layout/Circle'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useProjectStatusFilter } from './ProjectStatusFilterProvider'
import { projectStatuses } from '@increaser/entities/Project'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { getProjectStatusColor } from '../../utils/getProjectStatusColor'

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
