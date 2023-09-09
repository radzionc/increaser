import { ProjectsWeeks } from 'projects/components/ProjectsAnalytics/ProjectsWeeks'
import { weeksToDisplay } from 'projects/components/ProjectsProvider'
import { useProjects } from 'projects/hooks/useProjects'
import { sum } from '@increaser/utils/array/sum'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { PreviousProjectsDistribution } from './PreviousProjectsDistribution'
import { convertDuration } from '@increaser/utils/time/convertDuration'

export const PreviousCapacity = () => {
  const { weeks: partialWeeks } = useProjects()

  const weeks = partialWeeks.filter((week) => week.projects.length > 0)
  const total = sum(
    weeks.map(({ projects }) => sum(projects.map((p) => p.seconds))),
  )

  if (!total) return null

  return (
    <Panel kind="secondary">
      <TitledSection
        title={
          <Text as="div" size={18} weight="bold" color="shy">
            <HStack gap={8}>
              <Text>Last {weeksToDisplay} weeks:</Text>
              <Text color="regular" as="span">
                {Math.round(convertDuration(total / weeks.length, 's', 'h'))}h /
                week
              </Text>
            </HStack>
          </Text>
        }
      >
        <VStack gap={40}>
          <ProjectsWeeks />
          <PreviousProjectsDistribution />
        </VStack>
      </TitledSection>
    </Panel>
  )
}
