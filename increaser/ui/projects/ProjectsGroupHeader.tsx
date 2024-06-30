import { ProjectStatus } from '@increaser/entities/Project'
import { HStack } from '@lib/ui/layout/Stack'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Circle } from '@lib/ui/layout/Circle'
import styled, { useTheme } from 'styled-components'
import { getProjectStatusColor } from '@increaser/app/projects/utils/getProjectStatusColor'
import { Text } from '@lib/ui/text'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

type ProjectsGroupProps = {
  count: number
  status: ProjectStatus
}

const IndicatorWrapper = styled(IconWrapper)`
  width: 14px;
`

export const ProjectsGroupHeader = ({ status, count }: ProjectsGroupProps) => {
  const theme = useTheme()

  return (
    <HStack style={{ marginBottom: 8 }} alignItems="center" gap={8}>
      <IndicatorWrapper>
        <Circle size={8} background={getProjectStatusColor(status, theme)} />
      </IndicatorWrapper>
      <Text weight="semibold" color="supporting" size={14}>
        {capitalizeFirstLetter(status)} ({count})
      </Text>
    </HStack>
  )
}
