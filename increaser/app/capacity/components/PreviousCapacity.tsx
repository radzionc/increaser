import { ProjectsWeeks } from '@increaser/app/projects/components/ProjectsAnalytics/ProjectsWeeks'
import { weeksToDisplay } from '@increaser/app/projects/components/ProjectsProvider'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { sum } from '@lib/utils/array/sum'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { PreviousProjectsDistribution } from './PreviousProjectsDistribution'
import { convertDuration } from '@lib/utils/time/convertDuration'

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
