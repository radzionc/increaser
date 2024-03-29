import React from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { VStack } from '@lib/ui/layout/Stack'
import { toPercents } from '@lib/utils/toPercents'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { useOrderedTimeSeries } from '../hooks/useOrderedTimeSeries'
import { useCurrentFrameTotalTracked } from '../hooks/useCurrentFrameTotalTracked'
import { BreakdownContainer } from './BreakdownContainer'
import { InteractiveRow } from './InteractiveRow'
import { BreakdownRowContent } from './BreakdownRowContent'
import { ProjectIndicator } from './ProjectIndicator'
import { BreakdownHeader } from './BreakdownHeader'
import { BreakdownValue } from './BreakdownValue'

export const ProjectsDistributionBreakdown = () => {
  const { projects } = useTrackedTime()
  const { projectsTimeSeries, activeProjectId, setState } =
    useTrackedTimeReport()

  const { colors } = useTheme()

  const items = useOrderedTimeSeries()

  const total = useCurrentFrameTotalTracked()

  return (
    <BreakdownContainer>
      <BreakdownHeader />
      <SeparatedByLine alignItems="start" fullWidth gap={12}>
        <VStack gap={2}>
          {items.map(({ id, data }) => {
            const seconds = sum(data)
            const isPrimary = !activeProjectId || activeProjectId === id
            return (
              <InteractiveRow
                onClick={() =>
                  setState((state) => ({
                    ...state,
                    activeProjectId: id,
                  }))
                }
                isActive={activeProjectId === id}
              >
                <BreakdownRowContent key={id}>
                  <ProjectIndicator
                    style={{
                      background: (isPrimary
                        ? projects[id].hslaColor
                        : colors.mist
                      ).toCssValue(),
                    }}
                  />
                  <Text cropped>{projects[id].name}</Text>
                  <BreakdownValue
                    value={formatDuration(seconds, 's', {
                      maxUnit: 'h',
                    })}
                  />
                  <BreakdownValue
                    value={formatDuration(seconds / data.length, 's', {
                      maxUnit: 'h',
                      kind: 'short',
                    })}
                  />
                  <BreakdownValue
                    value={toPercents(seconds / total, 'round')}
                  />
                </BreakdownRowContent>
              </InteractiveRow>
            )
          })}
        </VStack>
        <InteractiveRow
          onClick={() =>
            setState((state) => ({
              ...state,
              activeProjectId: null,
            }))
          }
          isActive={!activeProjectId}
        >
          <BreakdownRowContent>
            <div />
            <Text>All projects</Text>
            <BreakdownValue
              value={formatDuration(total, 's', {
                maxUnit: 'h',
              })}
            />
            <BreakdownValue
              value={formatDuration(
                total / Object.values(projectsTimeSeries)[0].length,
                's',
                {
                  maxUnit: 'h',
                },
              )}
            />
            <BreakdownValue value="100%" />
          </BreakdownRowContent>
        </InteractiveRow>
      </SeparatedByLine>
    </BreakdownContainer>
  )
}
