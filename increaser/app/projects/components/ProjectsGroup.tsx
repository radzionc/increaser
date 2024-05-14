import { ProjectStatus } from '@increaser/entities/Project'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useMemo } from 'react'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Circle } from '@lib/ui/layout/Circle'
import { useTheme } from 'styled-components'
import { getProjectStatusColor } from '../utils/getProjectStatusColor'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { ProjectItem } from './ProjectItem'

export const ProjectsGroup = ({
  value,
}: ComponentWithValueProps<ProjectStatus>) => {
  const { projects } = useProjects()

  const theme = useTheme()

  const items = useMemo(() => {
    return projects.filter((p) => p.status === value)
  }, [projects, value])

  return (
    <ExpandableSection
      defaultIsOpen={value === 'active'}
      title={
        <HStack alignItems="center" gap={8}>
          <Circle size={8} background={getProjectStatusColor(value, theme)} />
          <Text>{capitalizeFirstLetter(value)}</Text>{' '}
          {items.length > 0 && (
            <Text as="span" color="supporting">
              ({items.length})
            </Text>
          )}
        </HStack>
      }
    >
      <VStack gap={8}>
        {items.map((item) => (
          <CurrentProjectProvider key={item.id} value={item}>
            <ProjectItem />
          </CurrentProjectProvider>
        ))}
      </VStack>
    </ExpandableSection>
  )
}
