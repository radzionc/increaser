import { ProjectsWeeks } from '@increaser/app/projects/components/ProjectsAnalytics/ProjectsWeeks'
import { sum } from '@lib/utils/array/sum'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { PreviousProjectsDistribution } from './PreviousProjectsDistribution'
import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  useProjects,
  weeksToDisplay,
} from '@increaser/ui/projects/ProjectsProvider'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { InfoIconFilled } from '@lib/ui/icons/InfoIconFilled'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'

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
          <HStack alignItems="center" gap={8}>
            <Text as="div" size={18} weight="bold" color="shy">
              <HStack gap={8}>
                <Text>Avg. week:</Text>
                <Text color="regular" as="span">
                  {Math.round(convertDuration(total / weeks.length, 's', 'h'))}h
                </Text>
              </HStack>
            </Text>
            <Tooltip
              content={`Average is calculated based on the last ${weeksToDisplay} weeks.`}
              renderOpener={(props) => (
                <IconWrapper {...props} style={{ fontSize: 14 }}>
                  <InfoIconFilled />
                </IconWrapper>
              )}
            />
          </HStack>
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
