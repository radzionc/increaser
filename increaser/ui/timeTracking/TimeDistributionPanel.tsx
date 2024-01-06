import { sum } from '@lib/utils/array/sum'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { convertDuration } from '@lib/utils/time/convertDuration'
import {
  useProjects,
  weeksToDisplay,
} from '@increaser/ui/projects/ProjectsProvider'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { InfoIconFilled } from '@lib/ui/icons/InfoIconFilled'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useState } from 'react'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'

export const TimeDistributionPanel = () => {
  const { weeks: partialWeeks, activeProjects, projectsRecord } = useProjects()

  const weeks = partialWeeks.filter((week) => week.projects.length > 0)
  const total = sum(
    weeks.map(({ projects }) => sum(projects.map((p) => p.seconds))),
  )

  const [activeProject, setActiveProject] = useState<string | null>(null)

  return (
    <Panel kind="secondary">
      <VStack gap={20}>
        <HStack fullWidth justifyContent="space-between" alignItems="center">
          <Text as="div" size={18} weight="bold" color="shy">
            <HStack wrap="wrap" alignItems="center" gap={8}>
              <Text>Avg. week:</Text>
              <HStack alignItems="center" gap={8}>
                <Text color="regular">
                  {Math.round(convertDuration(total / weeks.length, 's', 'h'))}h
                </Text>
                <Tooltip
                  content={`Average is based on the previous ${weeksToDisplay} weeks`}
                  renderOpener={(props) => (
                    <IconWrapper {...props} style={{ fontSize: 14 }}>
                      <InfoIconFilled />
                    </IconWrapper>
                  )}
                />
              </HStack>
            </HStack>
          </Text>
          <ExpandableSelector
            style={{ width: 132 }}
            value={activeProject}
            onChange={setActiveProject}
            options={[null, ...activeProjects.map((project) => project.id)]}
            getOptionKey={(option) => (option ? option : 'all')}
            renderOption={(option) => {
              return (
                <HStack
                  style={{ overflow: 'hidden' }}
                  alignItems="center"
                  gap={8}
                >
                  {option ? (
                    <>
                      <Text color="contrast">
                        {projectsRecord[option].emoji}
                      </Text>
                      <Text cropped>{projectsRecord[option].name}</Text>
                    </>
                  ) : (
                    <Text cropped>All projects</Text>
                  )}
                </HStack>
              )
            }}
          />
        </HStack>
        Coming soon!
      </VStack>
    </Panel>
  )
}
