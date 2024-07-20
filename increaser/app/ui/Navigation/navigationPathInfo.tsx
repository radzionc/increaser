import { ListIcon } from '@lib/ui/icons/ListIcon'
import { UserIcon } from '@lib/ui/icons/UserIcon'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { productToolNameRecord } from '@increaser/entities/ProductTool'
import { CoffeeIcon } from '@lib/ui/icons/CoffeeIcon'
import { CrownIcon } from '@lib/ui/icons/CrownIcon'
import { AppNavigationPage } from '@increaser/ui/navigation/app'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { LightBulbIcon } from '@lib/ui/icons/LightBulbIcon'

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
      name: 'Time tracking',
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
    account: {
      name: 'Account',
      icon: <UserIcon />,
    },
    community: {
      name: 'Community',
      icon: <GlobeIcon />,
    },
    plan: {
      name: 'Start your day',
      icon: <CoffeeIcon />,
    },
    vision: {
      name: 'Vision',
      icon: productToolIconRecord.vision,
    },
    goals: {
      name: 'Goals',
      icon: productToolIconRecord.goals,
    },
    membership: {
      name: 'Membership',
      icon: <CrownIcon />,
    },
    ideas: {
      name: 'Ideas',
      icon: <LightBulbIcon />,
    },
  } as const
