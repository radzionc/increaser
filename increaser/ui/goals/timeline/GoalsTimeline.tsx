import { useUser } from '@increaser/ui/user/state/user'
import { GoalsTimelineProvider } from './GoalsTimelineProvider'
import { VStack } from '@lib/ui/css/stack'
import { TimeLabels } from './TimeLabels'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { SetDobPrompt } from '../dob/SetDobPrompt'
import { goalsTimelineConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CurrentAge } from './CurrentAge'
import { GroupedGoals } from './GroupedGoals'
import { Spacer } from '@lib/ui/layout/Spacer'

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

  if (dob) {
    return (
      <GoalsTimelineProvider>
        <VStack>
          <GroupedGoals />
          <Spacer height={8} />
          <Line />
          <LabelsContainer>
            <TimeLabels />
            <CurrentAge />
          </LabelsContainer>
        </VStack>
      </GoalsTimelineProvider>
    )
  }

  return <SetDobPrompt />
}
