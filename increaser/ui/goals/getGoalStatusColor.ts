import { GoalStatus } from '@increaser/entities/Goal'
import { match } from '@lib/utils/match'
import { DefaultTheme } from 'styled-components/dist/types'

export const getGoalStatusColor = (status: GoalStatus, theme: DefaultTheme) =>
  match(status, {
    done: () => theme.colors.getLabelColor(7),
    inProgress: () => theme.colors.success,
    toDo: () => theme.colors.getLabelColor(9),
  })
