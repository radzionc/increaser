import styled, { useTheme } from 'styled-components'
import { goalsTimelineConfig } from './config'

import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getGoalStatusColor } from '../getGoalStatusColor'
import { useCurrentGoal } from '../CurrentGoalProvider'

const Container = styled.div`
  border: 2px solid ${getColor('mistExtra')};
  ${round}
  color: ${getColor('contrast')};
  background: ${getColor('background')};

  ${centerContent};
  ${sameDimensions(goalsTimelineConfig.goalHeight)};
  position: relative;
  font-size: 20px;
`

const Indicator = styled.div`
  position: absolute;
  ${sameDimensions(8)};
  ${round};
  right: 0;
  bottom: 0;
`

export const TimelineGoalItem = () => {
  const { emoji, status } = useCurrentGoal()

  const theme = useTheme()

  return (
    <Container>
      {emoji}
      <Indicator
        style={{
          background: getGoalStatusColor(status, theme).toCssValue(),
        }}
      />
    </Container>
  )
}
