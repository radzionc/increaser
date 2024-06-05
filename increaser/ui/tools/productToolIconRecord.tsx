import { ProductTool } from '@increaser/entities/ProductTool'
import { ReactNode } from 'react'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { LayersIcon } from '@lib/ui/icons/LayersIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'
import { StarIcon } from '@lib/ui/icons/StarIcon'
import { GridIcon } from '@lib/ui/icons/GridIcon'

export const productToolIconRecord: Record<ProductTool, ReactNode> = {
  trackTime: <TableIcon />,
  tasks: <CheckSquareIcon />,
  workBudget: <LayersIcon />,
  timePlanner: <GridIcon />,
  habits: <ZapIcon />,
  focus: <ClockIcon />,
  schedule: <CalendarIcon />,
  vision: <StarIcon />,
}
