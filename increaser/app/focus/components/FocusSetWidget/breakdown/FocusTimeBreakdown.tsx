import styled, { useTheme } from 'styled-components'
import { useMemo } from 'react'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useAssertFocusIntervals } from '@increaser/ui/focus/FocusContext'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'
import { VStack } from '@lib/ui/css/stack'
import { FocusBreakdownItemInfo } from './FocusBreakdownItemInfo'
import { FocusTimeBreakdownItem } from './FocusTimeBreakdownItem'
import { FocusTimeIndicators } from './FocusTimeIndicators'

const Container = styled.div`
  border: 1px solid ${getColor('textShy')};
  background: ${getColor('foreground')};
  ${borderRadius.s};
  overflow: hidden;

  display: grid;
  grid-template-columns: auto minmax(200px, auto);
  gap: 20px;

  padding: 20px;
`

export const FocusTimeBreakdown = () => {
  const { projects } = useAssertUserState()

  const { colors } = useTheme()

  const isPaused = useIsFocusPaused()

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
