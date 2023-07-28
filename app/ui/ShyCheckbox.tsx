import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import {
  InvisibleHTMLCheckboxProps,
  InvisibleHTMLCheckbox,
} from '@increaser/ui/ui/inputs/Checkbox/InvisibleHTMLCheckbox'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { croppedTextCSS } from '@increaser/ui/ui/utils/coppedTextCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'
import { roundedCSS } from '@increaser/ui/ui/utils/roundedCSS'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

interface CheckboxProps extends InvisibleHTMLCheckboxProps {
  label?: ReactNode
  className?: string
  color: HSLA
}

const InputWr = styled.div<{ $color: HSLA; isChecked: boolean }>`
  ${getSameDimensionsCSS(22)}
  border: 2px solid ${({ $color, isChecked, theme }) =>
    (isChecked ? $color : theme.colors.textSupporting).toCssValue()};
  ${roundedCSS};
  ${defaultTransitionCSS}
  ${centerContentCSS};
`

const Input = styled.div<{ isChecked: boolean; $color: HSLA }>`
  ${getSameDimensionsCSS(14)}
  ${roundedCSS}:
  ${centerContentCSS};

  color: ${({ theme }) => theme.colors.background.toCssValue()};

  ${defaultTransitionCSS}

  background: ${({ theme, isChecked, $color }) =>
    isChecked ? $color.toCssValue() : theme.colors.mist.toCssValue()};
`

const Container = styled(HStack)<{ isChecked: boolean }>`
  color: ${({ theme }) => theme.colors.text.toCssValue()};

  ${croppedTextCSS};

  cursor: pointer;

  ${defaultTransitionCSS}

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
