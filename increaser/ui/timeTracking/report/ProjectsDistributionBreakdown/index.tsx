import React from 'react'
import { sum } from '@lib/utils/array/sum'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { VStack } from '@lib/ui/layout/Stack'
import { toPercents } from '@lib/utils/toPercents'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { useOrderedTimeSeries } from '../hooks/useOrderedTimeSeries'
import { useCurrentFrameTotalTracked } from '../hooks/useCurrentFrameTotalTracked'
import { InteractiveRow } from './InteractiveRow'
import { BreakdownRowContent } from './BreakdownRowContent'
import { BreakdownValue } from './BreakdownValue'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { useTrackedTimeReportPreferences } from '../state/useTrackedTimeReportPreferences'

export const ProjectsDistributionBreakdown = () => {
  const { projects } = useTrackedTime()
  const [{ activeProjectId }, setState] = useTrackedTimeReportPreferences()

  const { colors } = useTheme()

  const items = useOrderedTimeSeries()

  const total = useCurrentFrameTotalTracked()

  return (
    <>
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
                <IconWrapper>{emoji}</IconWrapper>
                <Text cropped>{name}</Text>
                <AllocationLine
                  height={4}
                  segments={[
                    {
                      color: isPrimary ? color : colors.textShy,
                      proportion: seconds / total,
                    },
                  ]}
                />
                <BreakdownValue value={toPercents(seconds / total, 'round')} />
              </BreakdownRowContent>
            </VStack>
          </InteractiveRow>
        )
      })}
    </>
  )
}
