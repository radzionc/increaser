import { DayMoment } from '@increaser/entities/DayMoments'
import { match } from '@increaser/utils/match'
import { DefaultTheme } from 'styled-components'

export const getDayMomentColor = (dayMoment: DayMoment, theme: DefaultTheme) =>
  match(dayMoment, {
    wakeUpAt: () => theme.colors.getLabelColor(2),
    startWorkAt: () => theme.colors.getLabelColor(3),
    firstMealAt: () => theme.colors.getLabelColor(4),
    finishWorkAt: () => theme.colors.getLabelColor(6),
    lastMealAt: () => theme.colors.getLabelColor(7),
    goToBedAt: () => theme.colors.getLabelColor(9),
  })
