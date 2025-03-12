import { BoxIcon } from '@lib/ui/icons/BoxIcon'
import { ChartNoAxesCombinedIcon } from '@lib/ui/icons/ChartNoAxesCombinedIcon'
import { GiftIcon } from '@lib/ui/icons/GiftIcon'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { ScrollIcon } from '@lib/ui/icons/ScrollIcon'
import { AppNavigationPage } from '@product/ui/navigation/app'
import { productToolIconRecord } from '@product/ui/tools/productToolIconRecord'

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
    habits: {
      name: 'Habits',
      icon: productToolIconRecord.habits,
    },
    tasks: {
      name: 'Tasks',
      icon: productToolIconRecord.tasks,
    },
    projects: {
      name: 'Projects',
      icon: <BoxIcon />,
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
    roadmap: {
      name: 'Request features',
      icon: <GiftIcon />,
    },
    principles: {
      name: 'Principles',
      icon: <ScrollIcon />,
    },
    info: {
      name: 'Info',
      icon: <InfoIcon />,
    },
    timesheet: {
      name: 'Timesheet',
      icon: <ChartNoAxesCombinedIcon />,
    },
  } as const
