import React from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { VStack } from '@lib/ui/layout/Stack'
import { toPercents } from '@lib/utils/toPercents'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { useOrderedTimeSeries } from '../hooks/useOrderedTimeSeries'
import { useCurrentFrameTotalTracked } from '../hooks/useCurrentFrameTotalTracked'
import { BreakdownContainer } from './BreakdownContainer'
import { InteractiveRow } from './InteractiveRow'
import { BreakdownRowContent } from './BreakdownRowContent'
import { BreakdownValue } from './BreakdownValue'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'

export const ProjectsDistributionBreakdown = () => {
  const { projects } = useTrackedTime()
  const { activeProjectId, setState } = useTrackedTimeReport()

  const { colors } = useTheme()

  const items = useOrderedTimeSeries()

  const total = useCurrentFrameTotalTracked()

  return (
    <BreakdownContainer>
      <VStack fullWidth gap={20}>
        <div>
          <InteractiveRow
            onClick={() =>
              setState((state) => ({
                ...state,
                activeProjectId: null,
              }))
            }
            isActive={!activeProjectId}
          >
            <VStack gap={4}>
              <BreakdownRowContent>
                <BreakdownValue value="100%" />
                <Text>All projects</Text>
                <BreakdownValue
                  value={formatDuration(total, 's', {
                    maxUnit: 'h',
                  })}
                />
              </BreakdownRowContent>
              <AllocationLine
                height={4}
                segments={items.map(({ id, data }) => {
                  const seconds = sum(data)
                  const { color } = projects[id]
                  return {
                    color: activeProjectId
                      ? colors.textShy
                      : colors.getLabelColor(color),
                    proportion: seconds / total,
                  }
                })}
              />
            </VStack>
          </InteractiveRow>
        </div>
        <VStack gap={2}>
          {items.map(({ id, data }) => {
            const seconds = sum(data)
            const isPrimary = activeProjectId === id

            const { emoji, name, color } = projects[id]
            return (
              <InteractiveRow
                onClick={() =>
                  setState((state) => ({
                    ...state,
                    activeProjectId: id,
                  }))
                }
                key={id}
                isActive={activeProjectId === id}
              >
                <VStack gap={4}>
                  <BreakdownRowContent>
                    <BreakdownValue
                      value={toPercents(seconds / total, 'round')}
                    />
                    <Text cropped>
                      <EmojiTextPrefix emoji={emoji} />
                      {name}
                    </Text>
                    <BreakdownValue
                      value={formatDuration(seconds, 's', {
                        maxUnit: 'h',
                      })}
                    />
                  </BreakdownRowContent>
                  <AllocationLine
                    height={4}
                    segments={[
                      {
                        color: isPrimary
                          ? colors.getLabelColor(color)
                          : colors.textShy,
                        proportion: seconds / total,
                      },
                    ]}
                  />
                </VStack>
              </InteractiveRow>
            )
          })}
        </VStack>
      </VStack>
    </BreakdownContainer>
  )
}
