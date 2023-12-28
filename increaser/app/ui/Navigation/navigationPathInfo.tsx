import { Path } from '@increaser/app/router/Path'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { HomeIcon } from '@lib/ui/icons/HomeIcon'
import { ListIcon } from '@lib/ui/icons/ListIcon'
import { SettingsIcon } from '@lib/ui/icons/SettingsIcon'
import { TableIcon } from '@lib/ui/icons/TableIcon'
import { ZapIcon } from '@lib/ui/icons/ZapIcon'
import { GlobeIcon } from '@lib/ui/icons/GlobeIcon'

export const navigationPathInfo = {
  [Path.Home]: {
    name: 'Home',
    icon: <HomeIcon />,
  },
  [Path.Work]: {
    name: 'Focus',
    icon: <ClockIcon />,
  },
  [Path.Capacity]: {
    name: 'Manage time',
    icon: <TableIcon />,
  },
  [Path.Sessions]: {
    name: 'Schedule',
    icon: <CalendarIcon />,
  },
  [Path.Projects]: {
    name: 'Projects',
    icon: <ListIcon />,
  },
  [Path.Account]: {
    name: 'Settings',
    icon: <SettingsIcon />,
  },
  [Path.Habits]: {
    name: 'Habits',
    icon: <ZapIcon />,
  },
  [Path.Community]: {
    name: 'Community',
    icon: <GlobeIcon />,
  },
} as const
