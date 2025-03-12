import { HSLA } from '@lib/ui/colors/HSLA'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { toPercents } from '@lib/utils/toPercents'
import { goalStatusNameRecord } from '@product/entities/Goal'
import { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'

import { useCurrentGoal } from './CurrentGoalProvider'
import { getGoalStatusColor } from './getGoalStatusColor'

const Container = styled.span<{ $color: HSLA }>`
  height: 28px;
  ${borderRadius.s};
  font-size: 14px;
  flex-shrink: 0;
  font-weight: 600;
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
