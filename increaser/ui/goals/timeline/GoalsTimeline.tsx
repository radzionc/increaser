import { useAssertUserState } from '../../user/UserStateContext'
import { GoalsTimelineProvider } from './GoalsTimelineProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { TimeLabels } from './TimeLabels'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { SetDobPrompt } from '../dob/SetDobPrompt'
import { goalsTimelineConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CurrentAge } from './CurrentAge'

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: ${getColor('textSupporting')};
`

const LabelsContainer = styled.div`
  width: 100%;
  position: relative;
  height: ${toSizeUnit(goalsTimelineConfig.labelsHeight)};
`

export const GoalsTimeline = () => {
  const { dob } = useAssertUserState()

  if (dob) {
    return (
      <GoalsTimelineProvider>
        <VStack>
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
