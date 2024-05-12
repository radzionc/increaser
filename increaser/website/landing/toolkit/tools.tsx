import { ReactNode } from 'react'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { ListIcon } from '@lib/ui/icons/ListIcon'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { LayersIcon } from '@lib/ui/icons/LayersIcon'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'

export const tools = [
  'trackTime',
  'tasks',
  'workBudget',
  'focus',
  'timePlanner',
  'habits',
  'schedule',
] as const
export type Tool = (typeof tools)[number]

export const toolNames: Record<Tool, string> = {
  trackTime: 'Track time',
  tasks: 'Manage tasks',
  workBudget: 'Have a work budget',
  timePlanner: 'Plan time',
  focus: 'Rich deep focus',
  habits: 'Track daily habits',
  schedule: 'Set a schedule',
}

export const toolsIcons: Record<Tool, ReactNode> = {
  trackTime: <ListIcon />,
  tasks: <CheckSquareIcon />,
  workBudget: <LayersIcon />,
  timePlanner: <TargetIcon />,
  habits: <ZapIcon />,
  focus: <ClockIcon />,
  schedule: <CalendarIcon />,
}

export const toolColor: Record<Tool, number> = {
  trackTime: 4,
  tasks: 2,
  workBudget: 6,
  timePlanner: 7,
  habits: 3,
  focus: 5,
  schedule: 10,
}
