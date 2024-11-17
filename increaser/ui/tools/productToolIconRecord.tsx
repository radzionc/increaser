import { ProductTool } from '@increaser/entities/ProductTool'
import { ReactNode } from 'react'
import { TableIcon } from '@lib/ui/icons/TableIcon'
import { SparklesIcon } from '@lib/ui/icons/SparklesIcon'
import { GoalIcon } from '@lib/ui/icons/GoalIcon'
import { SquareCheckIcon } from '@lib/ui/icons/SquareCheckIcon'
import { TimerIcon } from '@lib/ui/icons/TimerIcon'
import { SproutIcon } from '@lib/ui/icons/SproutIcon'
import { TogglesIcon } from '@lib/ui/icons/TogglesIcon'
import { ScrollIcon } from '@lib/ui/icons/ScrollIcon'

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
