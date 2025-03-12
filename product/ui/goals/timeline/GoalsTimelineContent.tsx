import { Match } from '@lib/ui/base/Match'
import { Wrap } from '@lib/ui/base/Wrap'
import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

import { goalsTimelineConfig } from './config'
import { GoalsAgeTimeLabels } from './GoalsAgeTimeLabels'
import { GoalsAgeTimelineProvider } from './GoalsAgeTimelineProvider'
import { GoalsDateTimeLabels } from './GoalsDateTimeLabels'
import { GoalsDateTimelineProvider } from './GoalsDateTimelineProvider'
import { GoalsTimelineMarks } from './GoalsTimelineMarks'
import { GroupedGoals } from './GroupedGoals'
import { useGoalsTimelineType } from './state/goalsTimelineType'

const LabelsContainer = styled.div`
  width: 100%;
  position: relative;
  height: ${toSizeUnit(goalsTimelineConfig.timeLabelHeight)};
`

export const GoalsTimelineContent = () => {
  const [type] = useGoalsTimelineType()

  return (
    <VStack gap={4}>
      <Wrap
        wrap={(children) => (
          <Match
            value={type}
            age={() => (
              <GoalsAgeTimelineProvider>{children}</GoalsAgeTimelineProvider>
            )}
            date={() => (
              <GoalsDateTimelineProvider>{children}</GoalsDateTimelineProvider>
            )}
          />
        )}
      >
        <GroupedGoals />
        <GoalsTimelineMarks />
        <LabelsContainer>
          <Match
            value={type}
            date={() => <GoalsDateTimeLabels />}
            age={() => <GoalsAgeTimeLabels />}
          />
        </LabelsContainer>
      </Wrap>
    </VStack>
  )
}
