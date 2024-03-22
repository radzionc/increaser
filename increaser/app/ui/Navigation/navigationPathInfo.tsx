import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { HomeIcon } from '@lib/ui/icons/HomeIcon'
import { ListIcon } from '@lib/ui/icons/ListIcon'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { LayersIcon } from '@lib/ui/icons/LayersIcon'
import { TargetIcon } from '@lib/ui/icons/TargetIcon'

export const navigationPathInfo = {
  [AppPath.Home]: {
    name: 'Home',
    icon: <HomeIcon />,
  },
  [AppPath.Sessions]: {
    name: 'Schedule',
    icon: <CalendarIcon />,
  },
  [AppPath.Projects]: {
    name: 'Projects',
    icon: <ListIcon />,
  },
  [AppPath.Account]: {
    name: 'Settings',
    icon: <SettingsIcon />,
  },
  [AppPath.Habits]: {
    name: 'Habits',
    icon: <ZapIcon />,
  },
  [AppPath.Community]: {
    name: 'Community',
    icon: <GlobeIcon />,
  },
  [AppPath.Tasks]: {
    name: 'Tasks',
    icon: <CheckSquareIcon />,
  },
  [AppPath.TimeTracking]: {
    name: 'Track time',
    icon: <ClockIcon />,
  },
  [AppPath.WorkBudget]: {
    name: 'Work budget',
    icon: <LayersIcon />,
  },
  [AppPath.WeeklyGoals]: {
    name: 'Weekly goals',
    icon: <TargetIcon />,
  },
} as const
