import { ReactNode } from 'react'
import { DefaultTheme } from 'styled-components'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { FireIcon } from '@increaser/ui/ui/icons/FireIcon'
import { ForestIcon } from '@increaser/ui/ui/icons/ForestIcon'
import { WavesIcon } from '@increaser/ui/ui/icons/WavesIcon'

export const primaryGoals = ['workLess', 'awareness', 'workMore'] as const

export type PrimaryGoal = (typeof primaryGoals)[number]

export const primaryGoalName: Record<PrimaryGoal, string> = {
  workLess: 'Work less',
  awareness: 'Be aware',
  workMore: 'Work more',
}

export const primaryGoalIcon: Record<PrimaryGoal, ReactNode> = {
  workMore: <FireIcon />,
  workLess: <ForestIcon />,
  awareness: <WavesIcon />,
}

export const getPrimaryGoalColor = (goal: PrimaryGoal, theme: DefaultTheme) => {
  const color: Record<PrimaryGoal, HSLA> = {
    workMore: theme.colors.alert,
    workLess: theme.colors.success,
    awareness: theme.colors.idle,
  }

  return color[goal]
}
