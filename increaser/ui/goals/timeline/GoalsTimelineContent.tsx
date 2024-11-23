import { GoalsAgeTimelineProvider } from './GoalsAgeTimelineProvider'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { goalsTimelineConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { GroupedGoals } from './GroupedGoals'
import { Match } from '@lib/ui/base/Match'
import { useGoalsTimelineType } from './state/goalsTimelineType'
import { GoalsAgeTimeLabels } from './GoalsAgeTimeLabels'
import { GoalsDateTimelineProvider } from './GoalsDateTimelineProvider'
import { GoalsDateTimeLabels } from './GoalsDateTimeLabels'
import { Wrap } from '@lib/ui/base/Wrap'
import { GoalsTimelineMarks } from './GoalsTimelineMarks'

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
