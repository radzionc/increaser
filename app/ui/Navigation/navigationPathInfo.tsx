import { Path } from 'router/Path'
import { CalendarIcon } from '@increaser/ui/ui/icons/CalendarIcon'
import { ClockIcon } from '@increaser/ui/ui/icons/ClockIcon'
import { HomeIcon } from '@increaser/ui/ui/icons/HomeIcon'
import { ListIcon } from '@increaser/ui/ui/icons/ListIcon'
import { SettingsIcon } from '@increaser/ui/ui/icons/SettingsIcon'
import { TableIcon } from '@increaser/ui/ui/icons/TableIcon'
import { ZapIcon } from '@increaser/ui/ui/icons/ZapIcon'
import { GlobeIcon } from '@increaser/ui/ui/icons/GlobeIcon'

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
