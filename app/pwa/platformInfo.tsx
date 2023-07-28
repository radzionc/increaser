import { AndroidIcon } from '@increaser/ui/ui/icons/AndroidIcon'
import { AppleIcon } from '@increaser/ui/ui/icons/AppleIcon'
import { LinuxIcon } from '@increaser/ui/ui/icons/LinuxIcon'
import { WindowsIcon } from '@increaser/ui/ui/icons/WindowsIcon'

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
