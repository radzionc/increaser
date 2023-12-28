import { transition } from '@lib/ui/css/transition'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { InputProps } from '@lib/ui/props'
import styled, { css } from 'styled-components'

interface StepInputProps extends InputProps<number> {
  step?: number
  min: number
  max: number
}

const Button = styled(UnstyledButton)<{ isEnabled: boolean }>`
  ${centerContent};

  ${transition}
  ${borderRadius.m}

  aspect-ratio: 1 / 1;

  ${({ isEnabled, theme: { colors } }) =>
    isEnabled
      ? css`
          color: ${colors.text.toCssValue()};

          &:hover {
            background: ${colors.mist.toCssValue()};
            color: ${colors.contrast.toCssValue()};
          }
        `
      : css`
          color: ${colors.textShy.toCssValue()};
          cursor: default;
        `}
`

export const StepInput = ({
  value,
  onChange,
  step = 1,
  min,
  max,
}: StepInputProps) => {
  const isStepDownEnabled = value > min
  const isStepUpEnabled = value < max
  return (
    <>
      <Button
        onClick={isStepDownEnabled ? () => onChange(value - step) : undefined}
        isEnabled={isStepDownEnabled}
      >
        <MinusIcon />
      </Button>
      <Button
        onClick={isStepUpEnabled ? () => onChange(value + step) : undefined}
        isEnabled={isStepUpEnabled}
      >
        <PlusIcon />
      </Button>
    </>
  )
}
