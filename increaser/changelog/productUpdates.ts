import { ProductUpdate } from './ProductUpdate'

export const lastAnnouncementWasAt: number | undefined = undefined

export const productUpdates: ProductUpdate[] = [
  {
    releasedAt: 1721711243227,
    name: 'Enhanced Task Scheduling',
    description:
      'Our latest updates bring more control and clarity to your task management.',
    items: [
      {
        description:
          'Set specific workdays for weekly recurring tasks, allowing for better planning and organization.',
      },
      {
        description:
          'Set specific days for monthly recurring tasks, ensuring tasks are scheduled exactly when needed.',
      },
      {
        description:
          "Tasks with deadlines are now grouped by days in the 'To-Do' tab for a clearer, more organized view.",
      },
      {
        description:
          "Preview future recurring tasks in the 'To-Do' tab to always know what's ahead.",
      },
    ],
    videoId: 'deadline-index',
  },
  {
    releasedAt: 1721622940797,
    name: 'Product Updates',
    description:
      'Stay updated with the latest features and improvements directly within the app.',
    videoId: 'changelog',
  },
  {
    releasedAt: 1721550970258,
    name: 'Task templates',
    description:
      'Streamline task creation with reusable templates. Easily create, edit, and apply templates for frequently used tasks to save time and ensure consistency.',
    videoId: 'task-templates',
  },
]
