import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { HomeIcon } from '@lib/ui/icons/HomeIcon'
import { ListIcon } from '@lib/ui/icons/ListIcon'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'
import { AppPath } from '@increaser/ui/navigation/AppPath'

export const navigationPathInfo = {
  [AppPath.Home]: {
    name: 'Home',
    icon: <HomeIcon />,
  },
  [AppPath.Capacity]: {
    name: 'Manage time',
    icon: <TableIcon />,
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
} as const
