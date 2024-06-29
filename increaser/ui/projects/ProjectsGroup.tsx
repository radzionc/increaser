import { ProjectStatus } from '@increaser/entities/Project'
import {
  ComponentWithChildrenProps,
  ComponentWithValueProps,
} from '@lib/ui/props'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { VStack } from '@lib/ui/layout/Stack'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Circle } from '@lib/ui/layout/Circle'
import { useTheme } from 'styled-components'
import { ExpandableSectionListTitle } from '@lib/ui/layout/ExpandableSectionListTitle'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getProjectStatusColor } from '@increaser/app/projects/utils/getProjectStatusColor'
import { CreateProjectPrompt } from './CreateProjectPrompt'

type ProjectsGroupProps = ComponentWithValueProps<ProjectStatus> &
  ComponentWithChildrenProps & {
    count: number
  }

export const ProjectsGroup = ({
  children,
  value,
  count,
}: ProjectsGroupProps) => {
  const { projects } = useAssertUserState()

  const theme = useTheme()

  return (
    <ExpandableSection
      defaultIsOpen={value === 'active'}
      title={
        <ExpandableSectionListTitle
          identifier={
            <Circle size={8} background={getProjectStatusColor(value, theme)} />
          }
          title={capitalizeFirstLetter(value)}
          count={count}
        />
      }
    >
      <VStack>
        {children}
        {value === 'active' && <CreateProjectPrompt />}
      </VStack>
    </ExpandableSection>
  )
}
