import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { transition } from '@increaser/ui/css/transition'
import { HSLA } from '@increaser/ui/colors/HSLA'
import {
  InvisibleHTMLCheckboxProps,
  InvisibleHTMLCheckbox,
} from '@increaser/ui/inputs/Checkbox/InvisibleHTMLCheckbox'
import { centerContent } from '@increaser/ui/css/centerContent'
import { croppedTextCSS } from '@increaser/ui/utils/coppedTextCSS'
import { sameDimensions } from '@increaser/ui/css/sameDimensions'
import { round } from '@increaser/ui/css/round'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface CheckboxProps extends InvisibleHTMLCheckboxProps {
  label?: ReactNode
  className?: string
  color: HSLA
}

const InputWr = styled.div<{ $color: HSLA; isChecked: boolean }>`
  ${sameDimensions(22)}
  border: 2px solid ${({ $color, isChecked, theme }) =>
    (isChecked ? $color : theme.colors.textSupporting).toCssValue()};
  ${round};
  ${transition}
  ${centerContent};
`

const Input = styled.div<{ isChecked: boolean; $color: HSLA }>`
  ${sameDimensions(14)}
  ${round}:
  ${centerContent};

  color: ${({ theme }) => theme.colors.background.toCssValue()};

  ${transition}

  background: ${({ theme, isChecked, $color }) =>
    isChecked ? $color.toCssValue() : theme.colors.mist.toCssValue()};
`

const Container = styled(HStack)<{ isChecked: boolean }>`
  color: ${({ theme }) => theme.colors.text.toCssValue()};

  ${croppedTextCSS};

  cursor: pointer;

  ${transition}

  :hover {
    color: ${({ theme }) => theme.colors.contrast.toCssValue()};
  }

  ${({ isChecked }) =>
    !isChecked &&
    css`
      :hover ${InputWr} {
        border-color: ${({ theme }) => theme.colors.contrast.toCssValue()};
      }
    `}

  font-weight: 500;
`

export const ShyCheckbox = ({
  value,
  onChange,
  label,
  className,
  color,
}: CheckboxProps) => (
  <Container
    isChecked={value}
    className={className}
    as="label"
    alignItems="center"
    gap={8}
  >
    <InputWr $color={color} isChecked={value}>
      <Input $color={color} isChecked={value} />
    </InputWr>
    {label && <Text as="div">{label}</Text>}
    <InvisibleHTMLCheckbox value={value} onChange={onChange} />
  </Container>
)
