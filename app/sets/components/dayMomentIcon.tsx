import { DayMoment } from '@increaser/entities/User'
import { FlagIcon } from '@increaser/ui/icons/FlagIcon'
import { MoonIcon } from '@increaser/ui/icons/MoonIcon'
import { SunIcon } from '@increaser/ui/icons/SunIcon'
import { CoffeeIcon } from '@increaser/ui/icons/CoffeeIcon'
import { ReactNode } from 'react'

export const dayMomentIcon: Record<DayMoment, ReactNode> = {
  goalToWakeUpAt: <SunIcon />,
  goalToStartWorkAt: <CoffeeIcon />,
  goalToFinishWorkBy: <FlagIcon />,
  goalToGoToBedAt: <MoonIcon />,
}
