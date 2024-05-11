import { BrownNoiseIcon } from '@lib/ui/icons/BrownNoiseIcon'
import { CoffeeAltIcon } from '@lib/ui/icons/CoffeeAltIcon'
import { FireIcon } from '@lib/ui/icons/FireIcon'
import { ForestIcon } from '@lib/ui/icons/ForestIcon'
import { LeavesIcon } from '@lib/ui/icons/LeavesIcon'
import { MoonIcon } from '@lib/ui/icons/MoonIcon'
import { PinkNoiseIcon } from '@lib/ui/icons/PinkNoiseIcon'
import { RainIcon } from '@lib/ui/icons/RainIcon'
import { StormIcon } from '@lib/ui/icons/StormIcon'
import { StreamIcon } from '@lib/ui/icons/StreamIcon'
import { TrainIcon } from '@lib/ui/icons/TrainIcon'
import { WaterDropIcon } from '@lib/ui/icons/WaterDropIcon'
import { WavesIcon } from '@lib/ui/icons/WavesIcon'
import { WhiteNoiseIcon } from '@lib/ui/icons/WhiteNoiseIcon'
import { WindIcon } from '@lib/ui/icons/WindIcon'
import { BirdIcon } from '@lib/ui/icons/BirdIcon'
import { SnowIcon } from '@lib/ui/icons/SnowIcon'
import { KeyboardIcon } from '@lib/ui/icons/KeyboardIcon'
import { WaterfallIcon } from '@lib/ui/icons/WaterfallIcon'
import { RoadIcon } from '@lib/ui/icons/RoadIcon'
import { WindowIcon } from '@lib/ui/icons/WindowIcon'
import { ReactNode } from 'react'
import { FocusSound } from './state/useFocusSoundsPreference'

export const focusSoundIcon: Record<FocusSound, ReactNode> = {
  rain: <RainIcon />,
  storm: <StormIcon />,
  wind: <WindIcon />,
  stream: <StreamIcon />,
  seaside: <WavesIcon />,
  train: <TrainIcon />,
  fire: <FireIcon />,
  night: <MoonIcon />,
  coffee: <CoffeeAltIcon />,
  forest: <ForestIcon />,
  leaves: <LeavesIcon />,
  water: <WaterDropIcon />,
  white: <WhiteNoiseIcon />,
  pink: <PinkNoiseIcon />,
  brown: <BrownNoiseIcon />,
  birds: <BirdIcon />,
  snow: <SnowIcon />,
  keyboard: <KeyboardIcon />,
  waterfall: <WaterfallIcon />,
  window: <WindowIcon />,
  road: <RoadIcon />,
}
