import { sum } from '@lib/utils/array/sum'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import {
  useProjects,
  weeksToDisplay,
} from '@increaser/ui/projects/ProjectsProvider'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { InfoIconFilled } from '@lib/ui/icons/InfoIconFilled'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useMemo, useState } from 'react'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useTheme } from 'styled-components'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { findBy } from '@lib/utils/array/findBy'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { ProjectsDistribution } from './ProjectsDistribution'
import { BarChart, BarChartItem } from '@lib/ui/charts/BarChart'
import { getProjectColor } from '../projects/utils/getProjectColor'

export const TimeDistributionPanel = () => {
  const { weeks: partialWeeks, activeProjects, projectsRecord } = useProjects()

  const weeks = partialWeeks.filter((week) => week.projects.length > 0)

  const [activeProject, setActiveProject] = useState<string | null>(null)

  const theme = useTheme()
  const bars = useMemo(
    () =>
      weeks.map(({ projects, week }, index): BarChartItem => {
        return {
          value: activeProject
            ? projects.find((p) => p.id === activeProject)?.seconds || 0
            : sum(projects.map((p) => p.seconds)),
          color: activeProject
            ? getProjectColor(projectsRecord, theme, activeProject)
            : theme.colors.mist,
          label: index === weeks.length - 1 ? 'Last week' : `Week #${week + 1}`,
          renderValue: (value) =>
            value > 0 ? (
              <Text color="contrast">
                {formatDuration(value, 's', { maxUnit: 'h' })}
              </Text>
            ) : null,
        }
      }),
    [activeProject, projectsRecord, theme, weeks],
  )

  const total = activeProject
    ? sum(
        weeks.map(
          ({ projects }) => findBy(projects, 'id', activeProject)?.seconds ?? 0,
        ),
      )
    : sum(weeks.map((w) => sum(w.projects.map((p) => p.seconds))))

  return (
    <Panel kind="secondary">
      <VStack gap={20}>
        <HStack fullWidth justifyContent="space-between" alignItems="center">
          <Text as="div" size={18} weight="bold" color="shy">
            <HStack wrap="wrap" alignItems="center" gap={8}>
              <HStackSeparatedBy separator={slashSeparator}>
                <Text color="regular" as="span">
                  {formatDuration(total / weeks.length, 's', { maxUnit: 'h' })}
                </Text>
                <Text color="shy" as="span">
                  week
                </Text>
              </HStackSeparatedBy>
              <Tooltip
                content={`Average is based on the previous ${weeksToDisplay} weeks`}
                renderOpener={(props) => (
                  <IconWrapper {...props} style={{ fontSize: 14 }}>
                    <InfoIconFilled />
                  </IconWrapper>
                )}
              />
            </HStack>
          </Text>
          <ExpandableSelector
            style={{ width: 132 }}
            value={activeProject}
            onChange={setActiveProject}
            options={[null, ...activeProjects.map((project) => project.id)]}
            getOptionKey={(option) => (option ? option : 'all')}
            renderOption={(option) => (
              <>
                {option && (
                  <Text color="contrast">{projectsRecord[option].emoji}</Text>
                )}
                <Text>
                  {option ? projectsRecord[option].name : 'All projects'}
                </Text>
              </>
            )}
          />
        </HStack>
        <VStack gap={40}>
          <BarChart height={140} items={bars} />
          <ProjectsDistribution activeProject={activeProject} />
        </VStack>
      </VStack>
    </Panel>
  )
}
