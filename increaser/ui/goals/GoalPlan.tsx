import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentGoal } from './CurrentGoalProvider'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { getColor } from '@lib/ui/theme/getters'
import { Text } from '@lib/ui/text'
import { MapIcon } from '@lib/ui/icons/MapIcon'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const lineHeight = 22

const Container = styled(HStack)`
  font-size: 14px;
  align-items: start;
  line-height: ${toSizeUnit(lineHeight)};
  gap: 8px;
  color: ${getColor('textSupporting')};

  p {
    white-space: pre-line;
  }
`

const IconContainer = styled(IconWrapper)`
  height: ${toSizeUnit(lineHeight)};
`

export const GoalPlan = () => {
  const { plan } = useCurrentGoal()

  if (!plan) return null

  return (
    <Container>
      <IconContainer>
        <MapIcon />
      </IconContainer>
      <Text>{plan}</Text>
    </Container>
  )
}
