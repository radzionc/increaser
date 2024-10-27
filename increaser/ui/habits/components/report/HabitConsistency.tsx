import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { ProgressRing } from '@lib/ui/progress/ProgressRing'
import { text } from '@lib/ui/text'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { useCurrentHabit } from '../../CurrentHabitProvider'
import { getHabitPassedDays } from '@increaser/entities-utils/habit/getHabitPassedDays'
import { ActiveHabit } from '@increaser/entities/Habit'
import { pluralize } from '@lib/utils/pluralize'

const Container = styled.div`
  ${sameDimensions(tightListItemMinHeight)};
  ${centerContent};
  position: relative;
  ${text({
    size: 12,
    color: 'contrast',
    weight: 600,
  })}
`

const offset = 6

const ringSize = tightListItemMinHeight - offset

const Progress = styled(ProgressRing)`
  position: absolute;
  top: ${toSizeUnit(offset / 2)};
  left: ${toSizeUnit(offset / 2)};
`

export const HabitConsistency = () => {
  const { successes, startedAt } = useCurrentHabit() as ActiveHabit

  const daysCount = useMemo(
    () => getHabitPassedDays({ successes, startedAt }),
    [successes, startedAt],
  )

  const successesCount = successes.length

  const numberOfSkips = daysCount - successesCount

  const value = daysCount === 0 ? 0 : successesCount / daysCount

  const message = useMemo(() => {
    if (value === 0) {
      return undefined
    }

    if (numberOfSkips === 0) {
      return 'You never skip'
    }

    const averageDaysPerSkip = daysCount / numberOfSkips

    if (Math.round(averageDaysPerSkip) === 2) {
      return 'You skip every other day'
    } else {
      return `You skip once every ${pluralize(
        Math.round(averageDaysPerSkip),
        'day',
      )}`
    }
  }, [daysCount, numberOfSkips, value])

  const { colors } = useTheme()

  const color = useMemo(() => {
    if (value < 0.5) {
      return colors.alert
    }

    if (value < 0.75) {
      return colors.idle
    }

    return colors.success
  }, [colors, value])

  return (
    <Tooltip
      renderOpener={(props) => (
        <Container {...props}>
          {Math.round(value * 100)}
          <Progress color={color} size={ringSize} value={value} thickness={2} />
        </Container>
      )}
      content={message}
    />
  )
}
