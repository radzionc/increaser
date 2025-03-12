import { HStack } from '@lib/ui/css/stack'
import { Circle } from '@lib/ui/layout/Circle'
import { InputProps } from '@lib/ui/props'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { ProjectStatus, projectStatuses } from '@product/entities/Project'
import { useTheme } from 'styled-components'

import { getProjectStatusColor } from '../utils/getProjectStatusColor'

export const ProjectStatusInput = ({
  value,
  onChange,
}: InputProps<ProjectStatus>) => {
  const theme = useTheme()

  return (
    <ExpandableSelector
      value={value}
      onChange={onChange}
      options={projectStatuses}
      getOptionKey={(option) => option}
      style={{ minWidth: 140 }}
      getOptionName={(option) => capitalizeFirstLetter(option)}
      returnFocus
      renderOption={(option) => (
        <HStack alignItems="center" gap={8}>
          <Circle size={8} background={getProjectStatusColor(option, theme)} />
          <Text>{capitalizeFirstLetter(option)}</Text>
        </HStack>
      )}
    />
  )
}
