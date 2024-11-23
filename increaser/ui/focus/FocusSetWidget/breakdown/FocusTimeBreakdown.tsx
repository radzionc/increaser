import styled, { useTheme } from 'styled-components'
import { useMemo } from 'react'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { useUser } from '@increaser/ui/user/state/user'
import { VStack } from '@lib/ui/css/stack'
import { FocusBreakdownItemInfo } from './FocusBreakdownItemInfo'
import { FocusTimeBreakdownItem } from './FocusTimeBreakdownItem'
import { FocusTimeIndicators } from './FocusTimeIndicators'
import {
  useAssertFocusStatus,
  useAssertFocusIntervals,
} from '../../state/focusIntervals'

const Container = styled.div`
  border: 1px solid ${getColor('textShy')};
  background: ${getColor('foreground')};
  ${borderRadius.s};
  overflow: hidden;

  display: grid;
  grid-template-columns: auto minmax(200px, auto);
  gap: 20px;

  padding: 4px 16px;
`

export const FocusTimeBreakdown = () => {
  const { projects } = useUser()

  const { colors } = useTheme()

  const isPaused = useAssertFocusStatus() === 'paused'

  const intervals = useAssertFocusIntervals()

  const now = useRhythmicRerender()
  const items = useMemo(() => {
    const sets = focusIntervalsToSets({ intervals, now })

    const items: FocusBreakdownItemInfo[] = []
    sets.forEach((set, index) => {
      const nextSet = sets[index + 1]

      const { name, color } = projects[set.projectId]

      items.push({
        name,
        color: colors.getLabelColor(color),
        kind: 'primary',
        interval: set,
      })

      const hasBreak = nextSet ? nextSet.start !== set.end : isPaused

      if (!hasBreak) return

      items.push({
        name: 'Break',
        color: colors.mistExtra,
        kind: 'secondary',
        interval: {
          start: set.end,
          end: nextSet?.start || now,
        },
      })
    })

    return items
  }, [colors, intervals, isPaused, now, projects])

  return (
    <Container>
      <FocusTimeIndicators value={items} />
      <VStack>
        {items.map((item) => (
          <FocusTimeBreakdownItem key={item.interval.start} value={item} />
        ))}
      </VStack>
    </Container>
  )
}
