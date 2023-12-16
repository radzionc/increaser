import { DayMoment } from '@increaser/entities/User'
import { match } from '@increaser/utils/match'
import { DefaultTheme } from 'styled-components'

export const getDayMomentColor = (dayMoment: DayMoment, theme: DefaultTheme) =>
  match(dayMoment, {
    goalToWakeUpAt: () => theme.colors.getLabelColor(2),
    goalToStartWorkAt: () => theme.colors.getLabelColor(3),
    firstMealStartsAt: () => theme.colors.getLabelColor(4),
    goalToFinishWorkBy: () => theme.colors.getLabelColor(6),
    lastMealStartsAt: () => theme.colors.getLabelColor(7),
    goalToGoToBedAt: () => theme.colors.getLabelColor(9),
  })
