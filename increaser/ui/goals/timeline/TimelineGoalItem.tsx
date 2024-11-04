import styled, { useTheme } from 'styled-components'
import { goalsTimelineConfig } from './config'

import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getGoalStatusColor } from '../getGoalStatusColor'
import { useCurrentGoal } from '../CurrentGoalProvider'
import { interactive } from '@lib/ui/css/interactive'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

const Container = styled.div`
  ${interactive};
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
  const { emoji, status, id } = useCurrentGoal()

  const theme = useTheme()

  const [, setActiveItemId] = useActiveItemId()

  return (
    <Container onClick={() => setActiveItemId(id)}>
      {emoji}
      <Indicator
        style={{
          background: getGoalStatusColor(status, theme).toCssValue(),
        }}
      />
    </Container>
  )
}
