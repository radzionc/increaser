import { DayMoment } from '@increaser/entities/User'
import { FlagIcon } from '@increaser/ui/icons/FlagIcon'
import { MoonIcon } from '@increaser/ui/icons/MoonIcon'
import { SunIcon } from '@increaser/ui/icons/SunIcon'
import { ReactNode } from 'react'

export const dayMomentIcon: Record<DayMoment, ReactNode> = {
  goalToStartWorkAt: <SunIcon />,
  goalToFinishWorkBy: <FlagIcon />,
  goalToGoToBedAt: <MoonIcon />,
}
