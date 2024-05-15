import { ProjectStatus } from '@increaser/entities/Project'
import { Circle } from '@lib/ui/layout/Circle'
import { HStack } from '@lib/ui/layout/Stack'
import { ComponentWithValueProps } from '@lib/ui/props'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Text } from '@lib/ui/text'
import { useTheme } from 'styled-components'
import { getProjectStatusColor } from '../utils/getProjectStatusColor'

export const ProjectStatusOption = ({
  value,
}: ComponentWithValueProps<ProjectStatus>) => {
  const theme = useTheme()

  return (
    <HStack alignItems="center" gap={8}>
      <Circle size={8} background={getProjectStatusColor(value, theme)} />
      <Text size={14}>{capitalizeFirstLetter(value)}</Text>
    </HStack>
  )
}
