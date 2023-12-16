import { FlagIcon } from '@increaser/ui/icons/FlagIcon'
import { MoonIcon } from '@increaser/ui/icons/MoonIcon'
import { SunIcon } from '@increaser/ui/icons/SunIcon'
import { CoffeeIcon } from '@increaser/ui/icons/CoffeeIcon'
import { BreakfastIcon } from '@increaser/ui/icons/BreakfastIcon'
import { DinnerIcon } from '@increaser/ui/icons/DinnerIcon'
import { ReactNode } from 'react'
import { DayMoment } from '@increaser/entities/DayMoments'

export const dayMomentIcon: Record<DayMoment, ReactNode> = {
  wakeUpAt: <SunIcon />,
  startWorkAt: <CoffeeIcon />,
  finishWorkAt: <FlagIcon />,
  goToBedAt: <MoonIcon />,
  firstMealAt: <BreakfastIcon />,
  lastMealAt: <DinnerIcon />,
}
