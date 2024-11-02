import { useUser } from '@increaser/ui/user/state/user'
import { GoalsAgeTimelineProvider } from './GoalsAgeTimelineProvider'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { goalsTimelineConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CurrentAge } from './CurrentAge'
import { GroupedGoals } from './GroupedGoals'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ManageGoalsTimelineType } from './ManageGoalsTimelineType'
import { Match } from '@lib/ui/base/Match'
import { useGoalsTimelineType } from './state/goalsTimelineType'
import { SetDobPromptButton } from '../dob/SetDobPromptButton'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { format } from 'date-fns'
import { GoalsAgeTimeLabels } from './GoalsAgeTimeLabels'

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: ${getColor('mistExtra')};
`

const LabelsContainer = styled.div`
  width: 100%;
  position: relative;
  height: ${toSizeUnit(goalsTimelineConfig.labelsHeight)};
`

export const GoalsTimeline = () => {
  const { dob } = useUser()

  const [type] = useGoalsTimelineType()

  return (
    <VStack gap={20}>
      <HStack
        fullWidth
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
        gap={20}
      >
        <Match
          value={type}
          date={() => (
            <LabeledValue name="Today">
              {format(Date.now(), 'd MMMM yyyy')}
            </LabeledValue>
          )}
          age={() => (dob ? <CurrentAge /> : <SetDobPromptButton />)}
        />
        <ManageGoalsTimelineType />
      </HStack>
      <Match
        value={type}
        date={() => null}
        age={() =>
          dob ? (
            <GoalsAgeTimelineProvider>
              <VStack>
                <GroupedGoals />
                <Spacer height={8} />
                <Line />
                <LabelsContainer>
                  <GoalsAgeTimeLabels />
                </LabelsContainer>
              </VStack>
            </GoalsAgeTimelineProvider>
          ) : null
        }
      />
    </VStack>
  )
}
