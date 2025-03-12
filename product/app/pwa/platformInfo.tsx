import { AndroidIcon } from '@lib/ui/icons/AndroidIcon'
import { AppleIcon } from '@lib/ui/icons/AppleIcon'
import { LinuxIcon } from '@lib/ui/icons/LinuxIcon'
import { WindowsIcon } from '@lib/ui/icons/WindowsIcon'

import { Platform } from './Platform'

export const platformInfo = {
  [Platform.Windows]: {
    name: 'Windows',
    icon: <WindowsIcon />,
  },
  [Platform.Mac]: {
    name: 'Mac',
    icon: <AppleIcon />,
  },
  [Platform.iOS]: {
    name: 'iOS',
    icon: <AppleIcon />,
  },
  [Platform.Android]: {
    name: 'Android',
    icon: <AndroidIcon />,
  },
  [Platform.Linux]: {
    name: 'Linux',
    icon: <LinuxIcon />,
  },
} as const
