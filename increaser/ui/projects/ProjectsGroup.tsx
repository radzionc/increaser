import { ProjectStatus } from '@increaser/entities/Project'
import {
  ComponentWithChildrenProps,
  ComponentWithValueProps,
} from '@lib/ui/props'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { VStack } from '@lib/ui/layout/Stack'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Circle } from '@lib/ui/layout/Circle'
import styled, { useTheme } from 'styled-components'
import { getProjectStatusColor } from '@increaser/app/projects/utils/getProjectStatusColor'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Center } from '@lib/ui/layout/Center'
import { Text } from '@lib/ui/text'

const Frame = styled(ChecklistItemFrame)`
  padding: 0;
`

type ProjectsGroupProps = ComponentWithValueProps<ProjectStatus> &
  ComponentWithChildrenProps & {
    count: number
  }

export const ProjectsGroup = ({
  children,
  value,
  count,
}: ProjectsGroupProps) => {
  const theme = useTheme()

  return (
    <ExpandableSection
      defaultIsOpen={value === 'active'}
      title={
        <Frame>
          <Center>
            <Circle size={8} background={getProjectStatusColor(value, theme)} />
          </Center>
          <Text weight="semibold" color="supporting" size={14}>
            {capitalizeFirstLetter(value)} ({count})
          </Text>
        </Frame>
      }
    >
      <VStack>{children}</VStack>
    </ExpandableSection>
  )
}
