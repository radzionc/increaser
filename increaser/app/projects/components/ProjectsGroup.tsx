import { ProjectStatus } from '@increaser/entities/Project'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useMemo } from 'react'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { VStack } from '@lib/ui/layout/Stack'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Circle } from '@lib/ui/layout/Circle'
import { useTheme } from 'styled-components'
import { getProjectStatusColor } from '../utils/getProjectStatusColor'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { ProjectItem } from './ProjectItem'
import { CreateProjectPrompt } from './CreateProjectPrompt'
import { ExpandableSectionListTitle } from '@lib/ui/layout/ExpandableSectionListTitle'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const ProjectsGroup = ({
  value,
}: ComponentWithValueProps<ProjectStatus>) => {
  const { projects } = useAssertUserState()

  const theme = useTheme()

  const items = useMemo(() => {
    return Object.values(projects).filter((p) => p.status === value)
  }, [projects, value])

  if (items.length === 0 && value !== 'active') {
    return null
  }

  return (
    <ExpandableSection
      defaultIsOpen={value === 'active'}
      title={
        <ExpandableSectionListTitle
          identifier={
            <Circle size={8} background={getProjectStatusColor(value, theme)} />
          }
          title={capitalizeFirstLetter(value)}
          count={items.length}
        />
      }
    >
      <VStack gap={8}>
        {items.map((item) => (
          <CurrentProjectProvider key={item.id} value={item}>
            <ProjectItem />
          </CurrentProjectProvider>
        ))}
        {value === 'active' && <CreateProjectPrompt />}
      </VStack>
    </ExpandableSection>
  )
}
