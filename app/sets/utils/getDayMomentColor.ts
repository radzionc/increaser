import { DayMoment } from '@increaser/entities/User'
import { match } from '@increaser/utils/match'
import { DefaultTheme } from 'styled-components'

export const getDayMomentColor = (dayMoment: DayMoment, theme: DefaultTheme) =>
  match(dayMoment, {
    goalToStartWorkAt: () => theme.colors.getLabelColor(2),
    goalToFinishWorkBy: () => theme.colors.getLabelColor(1),
    goalToGoToBedAt: () => theme.colors.getLabelColor(9),
  })
