import { ProductTool } from '@increaser/entities/ProductTool'
import { ReactNode } from 'react'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { LayersIcon } from '@lib/ui/icons/LayersIcon'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'

export const productToolIconRecord: Record<ProductTool, ReactNode> = {
  trackTime: <TableIcon />,
  tasks: <CheckSquareIcon />,
  workBudget: <LayersIcon />,
  timePlanner: <TargetIcon />,
  habits: <ZapIcon />,
  focus: <ClockIcon />,
  schedule: <CalendarIcon />,
}
