import { BoxIcon } from '@lib/ui/icons/BoxIcon'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { AppNavigationPage } from '@increaser/ui/navigation/app'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { LightBulbIcon } from '@lib/ui/icons/LightBulbIcon'
import { GiftIcon } from '@lib/ui/icons/GiftIcon'
import { ScrollIcon } from '@lib/ui/icons/ScrollIcon'
import { TogglesIcon } from '@lib/ui/icons/TogglesIcon'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { ChartNoAxesCombinedIcon } from '@lib/ui/icons/ChartNoAxesCombinedIcon'

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
    preferences: {
      name: 'Preferences',
      icon: <TogglesIcon />,
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
