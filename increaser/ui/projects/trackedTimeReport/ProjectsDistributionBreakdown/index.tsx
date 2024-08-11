import React from 'react'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { VStack } from '@lib/ui/layout/Stack'
import { toPercents } from '@lib/utils/toPercents'
import { useCurrentFrameTotalTracked } from '../hooks/useCurrentFrameTotalTracked'
import { InteractiveRow } from './InteractiveRow'
import { BreakdownRowContent } from './BreakdownRowContent'
import { BreakdownValue } from './BreakdownValue'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'
import { useOrderedProjects } from '../projects/useOrderedProjects'

export const ProjectsDistributionBreakdown = () => {
  const projects = useTrackedProjects()
  const [activeProject, setActiveProject] = useActiveProject()

  const { colors } = useTheme()

  const items = useOrderedProjects()

  const total = useCurrentFrameTotalTracked()

  return (
    <>
      {items.map(({ key, value }) => {
        const isPrimary = activeProject === key

        const { emoji, name, color } = projects[key]
        return (
          <InteractiveRow
            onClick={() => setActiveProject(key)}
            key={key}
            isActive={activeProject === key}
          >
            <VStack gap={4}>
              <BreakdownRowContent>
                <IconWrapper>{emoji}</IconWrapper>
                <Text cropped>{name}</Text>
                <AllocationLine
                  height={4}
                  segments={[
                    {
                      color: isPrimary ? color : colors.textShy,
                      proportion: value / total,
                    },
                  ]}
                />
                <BreakdownValue value={toPercents(value / total, 'round')} />
              </BreakdownRowContent>
            </VStack>
          </InteractiveRow>
        )
      })}
    </>
  )
}
