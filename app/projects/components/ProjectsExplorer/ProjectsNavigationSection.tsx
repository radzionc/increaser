import { Project } from 'projects/Project'
import { ReactNode } from 'react'
import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'
import { Circle } from '@increaser/ui/ui/Circle'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { ProjectNavigationItem } from './ProjectNavigationItem'

interface ProjectsNavigationSectionProps {
  name: string
  color: HSLA
  projects: Project[]
  children?: ReactNode
}

export const ProjectsNavigationSection = ({
  name,
  projects,
  color,
  children,
}: ProjectsNavigationSectionProps) => {
  if (projects.length < 1 && !children) {
    return null
  }

  return (
    <VStack gap={8}>
      <HStack style={{ paddingLeft: 20 }} alignItems="center" gap={8}>
        <Circle size={8} background={color} />
        <Text color="supporting" weight="semibold">
          {capitalizeFirstLetter(name)}{' '}
          <Text as="span" weight="regular">
            ({projects.length})
          </Text>
        </Text>
      </HStack>
      <VStack gap={4}>
        <>
          {[...projects]
            .sort((a, b) => b.total - a.total)
            .map((project) => (
              <ProjectNavigationItem key={project.id} {...project} />
            ))}
          {children}
        </>
      </VStack>
    </VStack>
  )
}
