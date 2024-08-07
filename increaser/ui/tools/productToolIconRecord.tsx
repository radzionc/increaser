import { ProductTool } from '@increaser/entities/ProductTool'
import { ReactNode } from 'react'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { LayersIcon } from '@lib/ui/icons/LayersIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'
import { SparklesIcon } from '@lib/ui/icons/SparklesIcon'
import { GridIcon } from '@lib/ui/icons/GridIcon'
import { GoalIcon } from '@lib/ui/icons/GoalIcon'
import { SquareCheckIcon } from '@lib/ui/icons/SquareCheckIcon'
import { TimerIcon } from '@lib/ui/icons/TimerIcon'
import { SproutIcon } from '@lib/ui/icons/SproutIcon'

export const productToolIconRecord: Record<ProductTool, ReactNode> = {
  trackTime: <TableIcon />,
  tasks: <SquareCheckIcon />,
  workBudget: <LayersIcon />,
  timePlanner: <GridIcon />,
  habits: <SproutIcon />,
  focus: <TimerIcon />,
  schedule: <CalendarIcon />,
  vision: <SparklesIcon />,
  goals: <GoalIcon />,
}
