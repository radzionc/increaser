import styled from 'styled-components'
import { useFocusSoundsPreference } from './state/useFocusSoundsPreference'
import { transition } from '@lib/ui/css/transition'

import { Slider } from '@lib/ui/inputs/Slider'
import { ComponentWithValueProps } from '@lib/ui/props'
import { omit } from '@lib/utils/record/omit'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { VStack } from '@lib/ui/css/stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { getColor } from '@lib/ui/theme/getters'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { focusSoundIcon } from './focusSoundIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { FocusSound, focusSoundNameRecord } from '../focusSounds'
import { Text } from '@lib/ui/text'

const Wrapper = styled(ActionInsideInteractiveElement)`
  ${centerContent};
`

const Container = styled(UnstyledButton)<{ isActive: boolean }>`
  width: 100%;
  font-size: 32px;
  color: ${({ isActive, theme }) =>
    (isActive
      ? theme.colors.contrast
      : theme.colors.foreground.getVariant({ l: () => 32 })
    ).toCssValue()};

  ${transition};
  &:hover {
    color: ${getColor('contrast')};
  }
`

const SliderContainer = styled.div`
  width: 100%;
  ${horizontalPadding(8)}
`

const BottomSpacer = styled(Spacer)`
  ${centerContent};
`

export const FocusSoundOption = ({
  value,
}: ComponentWithValueProps<FocusSound>) => {
  const [proference, setPreference] = useFocusSoundsPreference()

  const isActive = value in proference

  return (
    <Wrapper
      actionPlacerStyles={{
        bottom: 0,
        width: '100%',
        maxWidth: 86,
        pointerEvents: isActive ? undefined : 'none',
      }}
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
            <Spacer {...actionSize}></Spacer>
            <IconWrapper>{focusSoundIcon[value]}</IconWrapper>
            <BottomSpacer {...actionSize}>
              {!isActive && (
                <Text color="supporting" size={12}>
                  {focusSoundNameRecord[value]}
                </Text>
              )}
            </BottomSpacer>
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
