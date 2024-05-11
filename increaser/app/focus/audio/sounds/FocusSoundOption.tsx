import { ReactNode } from 'react'
import styled from 'styled-components'
import {
  FocusSound,
  useFocusSoundsPreference,
} from './state/useFocusSoundsPreference'
import { transition } from '@lib/ui/css/transition'
import { RainIcon } from '@lib/ui/icons/RainIcon'
import { StormIcon } from '@lib/ui/icons/StormIcon'
import { WindIcon } from '@lib/ui/icons/WindIcon'
import { StreamIcon } from '@lib/ui/icons/StreamIcon'
import { WavesIcon } from '@lib/ui/icons/WavesIcon'
import { TrainIcon } from '@lib/ui/icons/TrainIcon'
import { FireIcon } from '@lib/ui/icons/FireIcon'
import { MoonIcon } from '@lib/ui/icons/MoonIcon'
import { CoffeeAltIcon } from '@lib/ui/icons/CoffeeAltIcon'
import { ForestIcon } from '@lib/ui/icons/ForestIcon'
import { LeavesIcon } from '@lib/ui/icons/LeavesIcon'
import { WaterDropIcon } from '@lib/ui/icons/WaterDropIcon'
import { WhiteNoiseIcon } from '@lib/ui/icons/WhiteNoiseIcon'
import { PinkNoiseIcon } from '@lib/ui/icons/PinkNoiseIcon'
import { BrownNoiseIcon } from '@lib/ui/icons/BrownNoiseIcon'

import { Slider } from '@lib/ui/inputs/Slider'
import { ComponentWithValueProps } from '@lib/ui/props'
import { omit } from '@lib/utils/record/omit'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

const Container = styled(UnstyledButton)<{ isActive: boolean }>`
  width: 100%;
  font-size: 32px;
  color: ${matchColor('isActive', {
    true: 'text',
    false: 'textShy',
  })};
  ${transition};
  &:hover {
    color: ${getColor('text')};
  }
`

const SliderContainer = styled.div`
  width: 100%;
  ${horizontalPadding(8)}
`

const focusIcon: Record<FocusSound, ReactNode> = {
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
}

export const FocusSoundOption = ({
  value,
}: ComponentWithValueProps<FocusSound>) => {
  const [proference, setPreference] = useFocusSoundsPreference()

  const isActive = value in proference

  return (
    <ActionInsideInteractiveElement
      actionPlacerStyles={{ bottom: 0, left: 0, width: '100%' }}
      render={({ actionSize }) => (
        <Container
          isActive={isActive}
          onClick={() =>
            isActive
              ? setPreference((state) => omit(state, value))
              : setPreference((state) => ({ ...state, [value]: 0.8 }))
          }
        >
          <VStack alignItems="center" gap={8}>
            <Spacer {...actionSize} />
            <IconWrapper>{focusIcon[value]}</IconWrapper>
            <Spacer {...actionSize} />
          </VStack>
        </Container>
      )}
      action={
        <SliderContainer
          style={isActive ? undefined : { visibility: 'hidden' }}
        >
          <Slider
            min={0}
            max={100}
            step={1}
            height={24}
            value={Math.round((proference[value] ?? 0) * 100)}
            onChange={(volume) =>
              setPreference((state) => ({ ...state, [value]: volume / 100 }))
            }
          />
        </SliderContainer>
      }
    />
  )
}
