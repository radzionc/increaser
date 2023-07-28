import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { defaultBorderRadiusCSS } from '@increaser/ui/ui/borderRadius'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import {
  InvisibleHTMLRadioProps,
  InvisibleHTMLRadio,
} from '@increaser/ui/ui/inputs/InvisibleHTMLRadio'
import { ReactNode } from 'react'
import styled, { css, useTheme } from 'styled-components'

const Container = styled.div<{ isSelected: boolean; $color: HSLA }>`
  ${defaultBorderRadiusCSS};
  ${defaultTransitionCSS};
  cursor: pointer;
  padding: 20px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.background.toCssValue()};
  ${({ isSelected, $color }) =>
    isSelected
      ? css`
          border-color: ${$color.toCssValue()};
        `
      : css`
          :hover {
            border-color: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
          }
        `};
`

interface Props extends InvisibleHTMLRadioProps {
  isSelected: boolean
  children: ReactNode
  className?: string
  color?: HSLA
}

export const LargeSelectOption = ({
  isSelected,
  children,
  className,
  color,
  ...rest
}: Props) => {
  const theme = useTheme()
  return (
    <Container
      as="label"
      className={className}
      tabIndex={-1}
      isSelected={isSelected}
      $color={color ?? theme.colors.text}
    >
      {children}
      <InvisibleHTMLRadio isSelected={isSelected} {...rest} />
    </Container>
  )
}
