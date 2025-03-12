import { CircleCheckIcon } from '@lib/ui/icons/CircleCheckIcon'
import { CircleDashedIcon } from '@lib/ui/icons/CircleDashedIcon'
import { CircleDotIcon } from '@lib/ui/icons/CircleDotIcon'
import { CircleIcon } from '@lib/ui/icons/CircleIcon'
import { TaskStatus } from '@product/entities/Task'
import { ReactNode } from 'react'

export const taskStatusIcon: Record<TaskStatus, ReactNode> = {
  backlog: <CircleDashedIcon />,
  todo: <CircleIcon />,
  inProgress: <CircleDotIcon />,
  done: <CircleCheckIcon />,
}
