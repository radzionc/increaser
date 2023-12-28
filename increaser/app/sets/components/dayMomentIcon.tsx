import { FlagIcon } from '@lib/ui/icons/FlagIcon'
import { MoonIcon } from '@lib/ui/icons/MoonIcon'
import { SunIcon } from '@lib/ui/icons/SunIcon'
import { CoffeeIcon } from '@lib/ui/icons/CoffeeIcon'
import { BreakfastIcon } from '@lib/ui/icons/BreakfastIcon'
import { DinnerIcon } from '@lib/ui/icons/DinnerIcon'
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
