import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled, { useTheme } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getGoalStatusColor } from './getGoalStatusColor'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { goalContentMinHeight } from './config'
import { GoalStatus, goalStatusNameRecord } from '@increaser/entities/Goal'

const Container = styled.div<{ $color: HSLA }>`
  height: ${toSizeUnit(goalContentMinHeight)};
  ${borderRadius.s};
  font-size: 14px;
  flex-shrink: 0;
  font-weight: 500;
  ${centerContent};
  ${horizontalPadding(8)}
  ${({ $color }) => coloredTag($color)}
`

export const GoalStatusTag = ({
  value,
}: ComponentWithValueProps<GoalStatus>) => {
  const theme = useTheme()

  return (
    <Container
      style={{ flexShrink: 0 }}
      $color={getGoalStatusColor(value, theme)}
    >
      {goalStatusNameRecord[value]}
    </Container>
  )
}
