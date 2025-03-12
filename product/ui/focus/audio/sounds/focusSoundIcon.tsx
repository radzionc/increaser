import { BirdIcon } from '@lib/ui/icons/BirdIcon'
import { BrownNoiseIcon } from '@lib/ui/icons/BrownNoiseIcon'
import { BubblesIcon } from '@lib/ui/icons/BubblesIcon'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { CoffeeAltIcon } from '@lib/ui/icons/CoffeeAltIcon'
import { FireIcon } from '@lib/ui/icons/FireIcon'
import { FireworksIcon } from '@lib/ui/icons/FireworksIcon'
import { ForestIcon } from '@lib/ui/icons/ForestIcon'
import { HorseIcon } from '@lib/ui/icons/HorseIcon'
import { KeyboardIcon } from '@lib/ui/icons/KeyboardIcon'
import { LeavesIcon } from '@lib/ui/icons/LeavesIcon'
import { MoonIcon } from '@lib/ui/icons/MoonIcon'
import { PapersStackIcon } from '@lib/ui/icons/PapersStackIcon'
import { PinkNoiseIcon } from '@lib/ui/icons/PinkNoiseIcon'
import { RainIcon } from '@lib/ui/icons/RainIcon'
import { RainyWindowIcon } from '@lib/ui/icons/RainyWindowIcon'
import { RoadIcon } from '@lib/ui/icons/RoadIcon'
import { SnorkelIcon } from '@lib/ui/icons/SnorkelIcon'
import { SnowIcon } from '@lib/ui/icons/SnowIcon'
import { StormIcon } from '@lib/ui/icons/StormIcon'
import { StreamIcon } from '@lib/ui/icons/StreamIcon'
import { TrainIcon } from '@lib/ui/icons/TrainIcon'
import { WaterDropIcon } from '@lib/ui/icons/WaterDropIcon'
import { WaterfallIcon } from '@lib/ui/icons/WaterfallIcon'
import { WavesIcon } from '@lib/ui/icons/WavesIcon'
import { WhiteNoiseIcon } from '@lib/ui/icons/WhiteNoiseIcon'
import { WindIcon } from '@lib/ui/icons/WindIcon'
import { ReactNode } from 'react'

import { FocusSound } from '../focusSounds'

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
  window: <RainyWindowIcon />,
  road: <RoadIcon />,
  horse: <HorseIcon />,
  fireworks: <FireworksIcon />,
  underwater: <SnorkelIcon />,
  paper: <PapersStackIcon />,
  clock: <ClockIcon />,
  bubbles: <BubblesIcon />,
}
