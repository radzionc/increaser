import styled, { css } from 'styled-components'
import { centerContent } from '../css/centerContent'
import { getColor, matchColor } from '../theme/getters'
import { transition } from '../css/transition'
import { CheckIcon } from '../icons/CheckIcon'
import { ComponentWithChildrenProps, UIComponentProps } from '../props'
import React from 'react'
import { interactive } from '../css/interactive'
import { IconWrapper } from '../icons/IconWrapper'

type CheckStatusProps = UIComponentProps & {
  value: boolean
  as?: React.ElementType
  isInteractive?: boolean
} & Partial<ComponentWithChildrenProps>

const IconContainer = styled(IconWrapper)``

const Container = styled.div<{ isChecked: boolean; isInteractive?: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;

  ${centerContent};

  border-radius: 4px;
  border: 1px solid ${getColor('textSupporting')};
  color: ${matchColor('isChecked', {
    true: 'background',
    false: 'transparent',
  })};
  ${transition}
  ${({ isChecked }) =>
    isChecked &&
    css`
      background: ${getColor('primary')};
      border-color: ${getColor('primary')};
    `};

  ${({ isInteractive, isChecked }) =>
    isInteractive &&
    css`
      ${interactive};
      &:hover {
        background: ${isChecked ? getColor('primary') : getColor('mist')};
      }

      &:hover ${IconContainer} {
        color: ${isChecked
          ? getColor('background')
          : getColor('textSupporting')};
      }
    `};
`

export const CheckStatus = ({
  value,
  children,
  isInteractive = false,
  ...rest
}: CheckStatusProps) => {
  return (
    <Container {...rest} isInteractive={isInteractive} isChecked={value}>
      <IconContainer>
        <CheckIcon />
      </IconContainer>
      {children}
    </Container>
  )
}
