import { TaskStatus } from '@increaser/entities/Task'
import { ReactNode } from 'react'
import { CircleCheckIcon } from '@lib/ui/icons/CircleCheckIcon'
import { CircleDashedIcon } from '@lib/ui/icons/CircleDashedIcon'
import { CircleIcon } from '@lib/ui/icons/CircleIcon'
import { CircleDotIcon } from '@lib/ui/icons/CircleDotIcon'

export const taskStatusIcon: Record<TaskStatus, ReactNode> = {
  backlog: <CircleDashedIcon />,
  todo: <CircleIcon />,
  inProgress: <CircleDotIcon />,
  done: <CircleCheckIcon />,
}
