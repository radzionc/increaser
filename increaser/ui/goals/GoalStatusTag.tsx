import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled, { useTheme } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getGoalStatusColor } from './getGoalStatusColor'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { goalContentMinHeight } from './config'
import { goalStatusNameRecord } from '@increaser/entities/Goal'
import { useCurrentGoal } from './CurrentGoalProvider'
import { useMemo } from 'react'
import { toPercents } from '@lib/utils/toPercents'

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

export const GoalStatusTag = () => {
  const theme = useTheme()

  const { status, target } = useCurrentGoal()

  const text = useMemo(() => {
    if (!target || !target.value || !target.current) {
      return goalStatusNameRecord[status]
    }

    return `${target.current} / ${target.value} (${toPercents(
      target.current / target.value,
      'round',
    )})`
  }, [status, target])

  return (
    <Container
      style={{ flexShrink: 0 }}
      $color={getGoalStatusColor(status, theme)}
    >
      {text}
    </Container>
  )
}
