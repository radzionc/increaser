import { TaskStatus } from '@increaser/entities/Task'
import { ReactNode } from 'react'
import { CircleCheckIcon } from '@lib/ui/icons/CircleCheckIcon'
import { CircleDashedIcon } from '@lib/ui/icons/CircleDashedIcon'
import { CircleIcon } from '@lib/ui/icons/CircleIcon'

export const taskStatusIcon: Record<TaskStatus, ReactNode> = {
  backlog: <CircleDashedIcon />,
  todo: <CircleIcon />,
  done: <CircleCheckIcon />,
}
