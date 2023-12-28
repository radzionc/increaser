import { ReactNode } from 'react'
import { DefaultTheme } from 'styled-components'
import { HSLA } from '@lib/ui/colors/HSLA'
import { FireIcon } from '@lib/ui/icons/FireIcon'
import { ForestIcon } from '@lib/ui/icons/ForestIcon'
import { WavesIcon } from '@lib/ui/icons/WavesIcon'
import { PrimaryGoal } from '@increaser/entities/User'

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
