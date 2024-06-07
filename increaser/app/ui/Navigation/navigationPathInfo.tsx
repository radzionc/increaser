import { ListIcon } from '@lib/ui/icons/ListIcon'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { productToolNameRecord } from '@increaser/entities/ProductTool'
import { CoffeeIcon } from '@lib/ui/icons/CoffeeIcon'
import { CrownIcon } from '@lib/ui/icons/CrownIcon'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'

export const navigationPathInfo = {
  [AppPath.Home]: {
    name: 'Focus',
    icon: productToolIconRecord.focus,
  },
  [AppPath.Sessions]: {
    name: 'Schedule',
    icon: productToolIconRecord.schedule,
  },
  [AppPath.Habits]: {
    name: 'Habits',
    icon: productToolIconRecord.habits,
  },
  [AppPath.Tasks]: {
    name: 'Tasks',
    icon: productToolIconRecord.tasks,
  },
  [AppPath.TimeTracking]: {
    name: 'Time tracking',
    icon: productToolIconRecord.trackTime,
  },
  [AppPath.WorkBudget]: {
    name: productToolNameRecord.workBudget,
    icon: productToolIconRecord.workBudget,
  },
  [AppPath.ProjectsBudget]: {
    name: productToolNameRecord.timePlanner,
    icon: productToolIconRecord.timePlanner,
  },
  [AppPath.Projects]: {
    name: 'Projects',
    icon: <ListIcon />,
  },
  [AppPath.Account]: {
    name: 'Settings',
    icon: <SettingsIcon />,
  },
  [AppPath.Community]: {
    name: 'Community',
    icon: <GlobeIcon />,
  },
  [AppPath.Plan]: {
    name: 'Start the day',
    icon: <CoffeeIcon />,
  },
  [AppPath.MyVision]: {
    name: 'Vision',
    icon: productToolIconRecord.vision,
  },
  [AppPath.Goals]: {
    name: 'Goals',
    icon: <TargetIcon />,
  },
  [AppPath.Membership]: {
    name: 'Membership',
    icon: <CrownIcon />,
  },
} as const
