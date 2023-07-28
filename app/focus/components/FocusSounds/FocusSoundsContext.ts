import { createContext } from 'react'

// YouTube channels
// https://www.youtube.com/c/MusicLabChill/videos?view=0&sort=p&flow=grid

export interface FocusSound {
  name: string
  url: string
  favourite?: boolean
}

export const defaultFocusSounds: FocusSound[] = [
  {
    name: 'Lofi jazz study music',
    url: 'https://youtu.be/bz5q5gl2uZA',
  },
  {
    name: 'Rainy night coffee shop',
    url: 'https://youtu.be/c0_ejQQcrwI',
  },
  {
    name: 'Cozy jazz coffee shop',
    url: 'https://youtu.be/VMAPTo7RVCo',
  },
  {
    name: 'Coffee shop with piano music',
    url: 'https://youtu.be/MYPVQccHhAQ',
  },
  {
    name: 'Ambient study music',
    url: 'https://youtu.be/sjkrrmBnpGE',
  },
  {
    name: 'Cozy cabin ambience',
    url: 'https://youtu.be/1RcVIuZ8Wdk',
  },
  {
    name: 'Productive music for work',
    url: 'https://youtu.be/ZVb_yKMivqo',
  },
  {
    name: 'Lofi hip hop',
    url: 'https://youtu.be/n61ULEU7CO0',
  },
  {
    name: 'Focus music',
    url: 'https://youtu.be/_4kHxtiuML0',
  },
  {
    name: 'Chillstep music',
    url: 'https://youtu.be/M5QY2_8704o',
  },
  {
    name: 'Work & study lofi jazz',
    url: 'https://youtu.be/CfPxlb8-ZQ0',
  },
  {
    name: 'Traveling mood jazz',
    url: 'https://youtu.be/J-gAeAjSifs',
  },
  {
    name: 'Classic music',
    url: 'https://youtu.be/mIYzp5rcTvU',
  },
  {
    name: 'Chill out beach sunset jazz',
    url: 'https://youtu.be/IKuiZi58cHY',
  },
  {
    name: `80's summer`,
    url: 'https://youtu.be/Nbd8MSXVcFA',
  },
  {
    name: 'Synthwave',
    url: 'https://youtu.be/k3WkJq478To',
  },
  {
    name: 'Brown noise',
    url: 'https://youtu.be/RqzGzwTY-6w',
  },
  {
    name: 'White noise',
    url: 'https://youtu.be/nMfPqeZjc2c',
  },
  {
    name: 'Dire Straits',
    url: 'https://youtu.be/Cr86cdpkrAY',
  },
  {
    name: 'Inspirational music',
    url: 'https://youtu.be/EG16dFYK0gw',
  },
]

export const defaultActiveSoundsUrl = defaultFocusSounds[0].url

export interface FocusSoundsState {
  isEnabled: boolean
  updateIsEnabled: (isEnabled: boolean) => void

  sounds: FocusSound[]
  updateSounds: (sounds: FocusSound[]) => void

  activeSoundUrl: string | null
  updateActiveSoundUrl: (url: string) => void

  isPlaying: boolean
  updateIsPlaying: (isPlaying: boolean) => void
}

export const FocusSoundsContext = createContext<FocusSoundsState | undefined>(
  undefined,
)
