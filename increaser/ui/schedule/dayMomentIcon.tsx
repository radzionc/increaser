import { FlagIconFilled } from '@lib/ui/icons/FlagIconFilled'
import { MoonIconFilled } from '@lib/ui/icons/MoonIconFilled'
import { SunIconFilled } from '@lib/ui/icons/SunIconFilled'
import { MugHotIcon } from '@lib/ui/icons/MugHotIcon'
import { EggIconFilled } from '@lib/ui/icons/EggIconFilled'
import { UtensilsIcon } from '@lib/ui/icons/UtensilsIcon'
import { ReactNode } from 'react'
import { DayMoment } from '@increaser/entities/DayMoments'

export const dayMomentIcon: Record<DayMoment, ReactNode> = {
  wakeUpAt: <SunIconFilled />,
  startWorkAt: <MugHotIcon />,
  finishWorkAt: <FlagIconFilled />,
  goToBedAt: <MoonIconFilled />,
  firstMealAt: <EggIconFilled />,
  lastMealAt: <UtensilsIcon />,
}
