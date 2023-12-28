import { ReactNode } from 'react'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Circle } from '@lib/ui/layout/Circle'
import { HSLA } from '@lib/ui/colors/HSLA'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { ProjectNavigationItem } from './ProjectNavigationItem'
import { EnhancedProject } from '@increaser/app/projects/Project'

interface ProjectsNavigationSectionProps {
  name: string
  color: HSLA
  projects: EnhancedProject[]
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
