import { ListIcon } from '@lib/ui/icons/ListIcon'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { productToolNameRecord } from '@increaser/entities/ProductTool'
import { AppNavigationPage } from '@increaser/ui/navigation/app'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { LightBulbIcon } from '@lib/ui/icons/LightBulbIcon'
import { GiftIcon } from '@lib/ui/icons/GiftIcon'
import { ScrollIcon } from '@lib/ui/icons/ScrollIcon'

type NavigationPathInfo = {
  name: string
  icon: React.ReactNode
}

export const navigationPathInfo: Record<AppNavigationPage, NavigationPathInfo> =
  {
    focus: {
      name: 'Focus',
      icon: productToolIconRecord.focus,
    },
    schedule: {
      name: 'Schedule',
      icon: productToolIconRecord.schedule,
    },
    habits: {
      name: 'Habits',
      icon: productToolIconRecord.habits,
    },
    tasks: {
      name: 'Tasks',
      icon: productToolIconRecord.tasks,
    },
    timeTracking: {
      name: 'Timesheet',
      icon: productToolIconRecord.trackTime,
    },
    workBudget: {
      name: productToolNameRecord.workBudget,
      icon: productToolIconRecord.workBudget,
    },
    timePlanning: {
      name: productToolNameRecord.timePlanner,
      icon: productToolIconRecord.timePlanner,
    },
    projects: {
      name: 'Projects',
      icon: <ListIcon />,
    },
    community: {
      name: 'Community',
      icon: <GlobeIcon />,
    },
    vision: {
      name: 'Vision',
      icon: productToolIconRecord.vision,
    },
    goals: {
      name: 'Goals',
      icon: productToolIconRecord.goals,
    },
    ideas: {
      name: 'Ideas',
      icon: <LightBulbIcon />,
    },
    roadmap: {
      name: 'Request features',
      icon: <GiftIcon />,
    },
    principles: {
      name: 'Principles',
      icon: <ScrollIcon />,
    },
  } as const
