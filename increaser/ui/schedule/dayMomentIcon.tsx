import { EggIconFilled } from '@lib/ui/icons/EggIconFilled'
import { UtensilsIcon } from '@lib/ui/icons/UtensilsIcon'
import { ReactNode } from 'react'
import { DayMoment } from '@increaser/entities/DayMoments'
import { CoffeeIcon } from '@lib/ui/icons/CoffeeIcon'
import { SunIcon } from '@lib/ui/icons/SunIcon'
import { MoonIcon } from '@lib/ui/icons/MoonIcon'
import { FlagIcon } from '@lib/ui/icons/FlagIcon'

export const dayMomentIcon: Record<DayMoment, ReactNode> = {
  wakeUpAt: <SunIcon />,
  startWorkAt: <CoffeeIcon />,
  finishWorkAt: <FlagIcon />,
  goToBedAt: <MoonIcon />,
  firstMealAt: <EggIconFilled />,
  lastMealAt: <UtensilsIcon />,
}
