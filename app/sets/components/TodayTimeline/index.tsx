import { ManageLastSet } from 'focus/components/ManageLastSet'
import {
  SessionProjectIdentifier,
  TimelineSession,
} from 'focus/components/TimelineSession'
import { useFocus } from 'focus/hooks/useFocus'
import { EndOfWorkStatus } from 'home/components/EndOfWorkStatus'
import { ProjectsAllocationLine } from 'projects/components/ProjectsAllocationLine'
import { ProjectTotal } from 'projects/components/ProjectTotal'
import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { getProjectName } from 'projects/utils/getProjectName'
import React, { ReactNode } from 'react'
import { getBlockDuration, getBlocks } from 'sets/Block'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { useWeekday } from 'shared/hooks/useWeekday'
import { formatDuration } from 'shared/utils/formatDuration'
import { toPercents } from '@increaser/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { VStack } from '@increaser/ui/ui/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'
import { MS_IN_MIN } from 'utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

import { BlockBoundaries } from '../BlockBoundaries'
import { TodayTimelineHourSpace } from './TodayTimelineHourSpace'
import { useTodayTimelineBoundaries } from './useTodayTimelineBoundaries'

const Container = styled(Panel)`
  height: 100%;
  min-height: 720px;
`

const Content = styled.div`
  position: relative;
  flex: 1;
`

interface Props {
  footer?: ReactNode
}

export const TodayTimeline = ({ footer = null }: Props) => {
  const todaySets = useTodaySets()
  const { currentSet } = useFocus()
  const { projectsRecord } = useProjects()
  const { allocation } = useWeekTimeAllocation()
  const weekday = useWeekday()
  const allocatedMinutes = allocation ? allocation[weekday] : 0

  const now = useRhythmicRerender()

  const theme = useTheme()

  const { start, end } = useTodayTimelineBoundaries()

  const dayStartedAt = useStartOfDay()
  const timelineStartedAt = dayStartedAt + start * MS_IN_MIN

  const timelineInMs = (end - start) * MS_IN_MIN

  const sets = [...todaySets]
  if (currentSet) {
    sets.push({
      start: currentSet.startedAt,
      end: now,
      projectId: currentSet.projectId,
    })
  }

  const blocks = getBlocks(sets)

  const setsTotal = getSetsSum(sets)

  const projectsTotal = getProjectsTotalRecord(sets)

  return (
    <Container withSections>
      <VStack fullWidth gap={8}>
        <LabeledValue name="Today">
          <HStackSeparatedBy
            separator={<Text color="shy">{slashSeparator}</Text>}
          >
            <Text weight="bold">{formatDuration(setsTotal, 'ms')}</Text>
            <Text color="supporting" size={14}>
              {formatDuration(allocatedMinutes, 'min')}
            </Text>
          </HStackSeparatedBy>
        </LabeledValue>
        <ProjectsAllocationLine
          projectsRecord={projectsRecord}
          sets={sets}
          allocatedMinutes={allocatedMinutes}
        />
        <VStack gap={4} fullWidth>
          {Object.entries(projectsTotal)
            .sort((a, b) => b[1] - a[1])
            .map(([projectId]) => (
              <ProjectTotal
                key={projectId}
                name={getProjectName(projectsRecord, projectId)}
                color={getProjectColor(projectsRecord, theme, projectId)}
                value={projectsTotal[projectId]}
              />
            ))}
        </VStack>
      </VStack>
      <Content>
        <VStack alignItems="start" gap={8} fullWidth fullHeight>
          <TodayTimelineHourSpace>
            {blocks.map((block, index) => {
              const blockDuration = getBlockDuration(block)

              const { sets } = block

              const isLastBlock = index === blocks.length - 1

              return (
                <React.Fragment key={index}>
                  <BlockBoundaries
                    block={block}
                    style={{
                      top: `calc(${toPercents(
                        (sets[0].start - timelineStartedAt) / timelineInMs,
                      )} - 2px)`,
                      height: `calc(${toPercents(
                        blockDuration / timelineInMs,
                      )} + 4px)`,
                      left: -2,
                      width: `calc(100% + 4px)`,
                    }}
                  />
                  {sets.map((set, index) => {
                    const height = getSetDuration(set) / timelineInMs

                    const top = (set.start - timelineStartedAt) / timelineInMs

                    const style = {
                      height: toPercents(height),
                      top: toPercents(top),
                    }

                    const isLastSet = index === sets.length - 1

                    const color = getProjectColor(
                      projectsRecord,
                      theme,
                      set.projectId,
                    )

                    if (!currentSet && isLastBlock && isLastSet) {
                      return (
                        <ManageLastSet
                          key="manage"
                          set={set}
                          color={color}
                          style={style}
                        />
                      )
                    }

                    return (
                      <TimelineSession
                        $color={theme.colors.mist}
                        key={index}
                        style={style}
                      >
                        {!currentSet && (
                          <SessionProjectIdentifier $color={color} />
                        )}
                      </TimelineSession>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </TodayTimelineHourSpace>
          <EndOfWorkStatus />
        </VStack>
      </Content>
      {footer}
    </Container>
  )
}
