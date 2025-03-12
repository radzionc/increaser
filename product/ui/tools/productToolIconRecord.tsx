import { GoalIcon } from '@lib/ui/icons/GoalIcon'
import { ScrollIcon } from '@lib/ui/icons/ScrollIcon'
import { SparklesIcon } from '@lib/ui/icons/SparklesIcon'
import { SproutIcon } from '@lib/ui/icons/SproutIcon'
import { SquareCheckIcon } from '@lib/ui/icons/SquareCheckIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'
import { TimerIcon } from '@lib/ui/icons/TimerIcon'
import { TogglesIcon } from '@lib/ui/icons/TogglesIcon'
import { ProductTool } from '@product/entities/ProductTool'
import { ReactNode } from 'react'

export const productToolIconRecord: Record<ProductTool, ReactNode> = {
  trackTime: <TableIcon />,
  tasks: <SquareCheckIcon />,
  habits: <SproutIcon />,
  focus: <TimerIcon />,
  vision: <SparklesIcon />,
  goals: <GoalIcon />,
  workPreferences: <TogglesIcon />,
  principles: <ScrollIcon />,
}
